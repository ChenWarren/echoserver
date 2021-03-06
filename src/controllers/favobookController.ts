import { Request, Response } from "express"
const FavBook = require('../models/FavBook')
const User = require('../models/User')

const addFavobook = async ( req: Request, res: Response) => {
    const { user, bookID } = req.body
    if(!user || !bookID.length ) return res.status(400).json({'message': 'User and book ID are required.'})

    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    const favobookOwnerCheck = await FavBook.findOne({ userID: userID}).exec()

    if(favobookOwnerCheck){

        try{

            for(let i=0; i<bookID.length; i++){
                const favobookCheck = await favobookOwnerCheck.favobooks.find((b:any)=>b.bookID==bookID[i])
                if(!favobookCheck){
                    await favobookOwnerCheck.favobooks.push({bookID: bookID[i]})
                }
            }

            await favobookOwnerCheck.save(async(err:any, books:any)=>{
                if(err) res.status(500).json({"message": err.message})

                const returnFavoBooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

                res.status(201).json({"message": "Favourite book added.", "favobooks":returnFavoBooks})
            })
            
        } catch (err: any){
            res.status(500).json({"message": err.message})
        }
    } else {

        try{
            const result = await FavBook.create({
                "userID": userID,
                "favobooks":[]
            })

            for( let i=0; i<bookID.length; i++){
                await result.favobooks.push({bookID: bookID[i]})
            }

            await result.save()

            const returnFavoBooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()
            
            res.status(201).json({"message": `New favourite book ${bookID} added!`, "favobooks": returnFavoBooks})
    
        } catch(err: any) {
            res.status(500).json({"message": err.message})
        }
    }

}

const updateFavoBooks = async (req: Request, res: Response) => {
    const { user, bookID } = req.body
    if(!user ) return res.status(400).json({'message': 'User is required.'})

    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    try{
        const getList = await FavBook.findOne({userID: userID}).exec() 
        getList.favobooks = []

        for( let i=0; i<bookID.length; i++){
            await getList.favobooks.push({bookID: bookID[i]})
        }

        await getList.save()

        res.status(201).json({"message": `Favo book updated!`})

    }catch(err:any){
        res.status(500).json({"message": err.message})
    }

}

const getFavoBooks = async ( req: Request, res: Response) => {
    const { user } = req.body
    if(!user) return res.status(400).json({'message': 'User ID is required.'})

    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    const favobookOwnerCheck = await FavBook.findOne({ userID: userID}).exec()
    if(!favobookOwnerCheck) return res.status(404).json({"message": `${userID} don't has a favourite book list.`})

    try {

        const favobooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

        res.status(200).json({"message": "Success", "favobooks":favobooks})

    } catch (err: any){
        res.status(500).json({"message": err.message})
    }
}

const deleteFavoBook = async ( req: Request, res: Response) => {
    const { user, bookID } = req.body

    if(!user || !bookID.length ) return res.status(400).json({'message': 'User and book ID are required.'})

    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    const favobookOwnerCheck = await FavBook.findOne({ userID: userID}).exec()

    if(favobookOwnerCheck){

        try {

            for(let i=0; i<bookID.length; i++){
                const newFavoBooks = await favobookOwnerCheck.favobooks.find((book:any)=>book.bookID==bookID[i])
                if(newFavoBooks){
                    await favobookOwnerCheck.favobooks.id(newFavoBooks._id).remove()
                } 
            }

            await favobookOwnerCheck.save()

            const returnFavoBooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

            res.status(200).json({"message": "Favourite book deleted.", "favobooks":returnFavoBooks})

        } catch (err: any) {
            res.status(500).json({"message": err.message})
        }

    } else {
        res.status(404).json({"message": `${userID} don't have a favourite book list.`})
    }

}


module.exports = { addFavobook, updateFavoBooks, getFavoBooks, deleteFavoBook}