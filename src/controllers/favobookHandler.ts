import { Request, Response } from "express"
import { rmSync } from "fs"
const FavBook = require('../models/FavBook')

const addFavobook = async ( req: Request, res: Response) => {
    const { userID, bookID } = req.body
    if(!userID || !bookID ) return res.status(400).json({'message': 'User and book ID are required.'})

    const favobookOwnerCheck = await FavBook.findOne({ userID: userID}).exec()

    if(favobookOwnerCheck){
        const favobookCheck = await favobookOwnerCheck.favobooks.find((b:any)=>b.bookID==bookID)
        
        if(favobookCheck){
            return res.status(409).json({"message": "This book is already in your favourite list!"})
        }

        try{

            favobookOwnerCheck.favobooks.push({bookID: bookID})

            await favobookOwnerCheck.save(async(err:any, books:any)=>{
                if(err) res.status(500).json({"message": err.message})

                const returnFavoBooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

                res.status(200).json({"message": "Favourite book added.", "favobooks":returnFavoBooks})
            })

            
        } catch (err: any){
            res.status(500).json({"message": err.message})
        }
    } else {

        try{
            const result = await FavBook.create({
                "userID": userID,
                "favobooks":[{
                    "bookID": bookID
                }]
            })
            const returnFavoBooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()
            res.status(201).json({"message": `New favourite book ${bookID} added!`, "favobooks": returnFavoBooks})
    
        } catch(err: any) {
            res.status(500).json({"message": err.message})
        }
    }

}

const getFavoBooks = async ( req: Request, res: Response) => {
    const { userID } = req.body
    if(!userID) return res.status(400).json({'message': 'User ID is required.'})

    try {

        const favobooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

        res.status(200).json({"message": "Success", "favobooks":favobooks})

    } catch (err: any){
        res.status(500).json({"message": err.message})
    }



}


module.exports = { addFavobook, getFavoBooks}