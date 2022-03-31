import { Request, Response } from "express"
const ReadBook = require('../models/ReadBook')
const User = require('../models/User')

const addReadbook = async ( req: Request, res: Response) => {
    const { user, bookID } = req.body
    if(!user || !bookID.length ) return res.status(400).json({'message': 'User and book ID are required.'})

    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    const readbookOwnerCheck = await ReadBook.findOne({ userID: userID}).exec()

    if(readbookOwnerCheck){

        try{

            for(let i=0; i<bookID.length; i++){
                const readbookCheck = await readbookOwnerCheck.readbooks.find((b:any)=>b.bookID==bookID[i])
                if(!readbookCheck){
                    await readbookOwnerCheck.readbooks.push({bookID: bookID[i]})
                }
            }

            await readbookOwnerCheck.save(async(err:any, books:any)=>{
                if(err) res.status(500).json({"message": err.message})

                const returnReadBooks = await ReadBook.findOne({ userID: userID}).populate({path:'readbooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

                res.status(201).json({"message": "Read book added.", "readbooks":returnReadBooks})
            })
            
        } catch (err: any){
            res.status(500).json({"message": err.message})
        }
    } else {

        try{
            const result = await ReadBook.create({
                "userID": userID,
                "readbooks":[]
            })

            for( let i=0; i<bookID.length; i++){
                await result.readbooks.push({bookID: bookID[i]})
            }

            await result.save()

            const returnFavoBooks = await ReadBook.findOne({ userID: userID}).populate({path:'readbooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()
            
            res.status(201).json({"message": `New read book ${bookID} added!`, "readbooks": returnFavoBooks})
    
        } catch(err: any) {
            res.status(500).json({"message": err.message})
        }
    }

}

const updateReadBooks = async (req: Request, res: Response) => {
    const { user, bookID } = req.body
    if(!user ) return res.status(400).json({'message': 'User is required.'})

    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    try{
        const getList = await ReadBook.findOne({userID: userID}).exec() 
        getList.readbooks = []

        for( let i=0; i<bookID.length; i++){
            await getList.readbooks.push({bookID: bookID[i]})
        }

        await getList.save()

        res.status(201).json({"message": `Read book updated!`})

    }catch(err:any){
        res.status(500).json({"message": err.message})
    }

}

const getReadBooks = async ( req: Request, res: Response) => {
    const { user } = req.body
    if(!user) return res.status(400).json({'message': 'User ID is required.'})

    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    const readbookOwnerCheck = await ReadBook.findOne({ userID: userID}).exec()
    if(!readbookOwnerCheck) return res.status(404).json({"message": `${userID} don't has a read book list.`})

    try {

        const readbooks = await ReadBook.findOne({ userID: userID}).populate({path:'readbooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

        res.status(200).json({"message": "Success", "readbooks":readbooks})

    } catch (err: any){
        res.status(500).json({"message": err.message})
    }
}

const deleteReadBook = async ( req: Request, res: Response) => {
    const { user, bookID } = req.body

    if(!user || !bookID.length ) return res.status(400).json({'message': 'User and book ID are required.'})

    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    const readbookOwnerCheck = await ReadBook.findOne({ userID: userID}).exec()

    if(readbookOwnerCheck){

        try {

            for(let i=0; i<bookID.length; i++){
                const newReadBooks = await readbookOwnerCheck.readbooks.find((book:any)=>book.bookID==bookID[i])
                if(newReadBooks){
                    await readbookOwnerCheck.readbooks.id(newReadBooks._id).remove()
                } 
            }

            await readbookOwnerCheck.save()

            const returnReadBooks = await ReadBook.findOne({ userID: userID}).populate({path:'readbooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

            res.status(200).json({"message": "Read book deleted.", "readbooks":returnReadBooks})

        } catch (err: any) {
            res.status(500).json({"message": err.message})
        }

    } else {
        res.status(404).json({"message": `${userID} don't have a read book list.`})
    }

}


module.exports = { addReadbook, updateReadBooks, getReadBooks, deleteReadBook}