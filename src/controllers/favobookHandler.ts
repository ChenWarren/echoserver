import { Request, Response } from "express"
const FavBook = require('../models/FavBook')

interface FavoBook {
    favobook: string
}

const addFavobook = async ( req: Request, res: Response) => {
    const { owner, favobook } = req.body
    if(!owner || !favobook ) return res.status(400).json({'message': 'User and book ID are required.'})

    const favobookOwnerCheck = await FavBook.findOne({owner: owner}).exec()

    if(favobookOwnerCheck){
        const favobookCheck = favobookOwnerCheck.favobooks.find((book:FavoBook)=>(book.favobook==favobook))
        if(favobookCheck){
            return res.status(409).json({"message": "This book is already in your favourite list!"})
        }
        try{
            const favoBookList = await favobookOwnerCheck.favobooks.push(favobook)
            const result = await FavBook.pudateOne({
                 owner: owner, 
                 favobooks: favoBookList
            })
    
        } catch (err: any){
            res.status(500).json({"message": err.message})
        }
    }

    try{
        const result = await FavBook.create({
            "owner": owner,
            "favobooks": [
                {
                    "favobook": favobook
                }
            ]
        })

        res.status(201).json({"message": `New favourite book ${favobook} added!`})

    } catch(err: any) {
        res.status(500).json({"message": err.message})
    }
}



module.exports = { addFavobook, }