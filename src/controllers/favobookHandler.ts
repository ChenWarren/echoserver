import { Request, Response } from "express"
const FavBook = require('../models/FavBook')

const addFavobook = async ( req: Request, res: Response) => {
    const { owner, favobook } = req.body
    if(!owner || !favobook ) return res.status(400).json({'message': 'User and book ID are required.'})
}



module.exports = { addFavobook, }