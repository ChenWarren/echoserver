const Book = require('../models/Book')
import { Request, Response } from "express"

const getAllBooks = async (req: Request, res: Response) => {
    const page = parseInt(req.params.p)
    const books = await Book.find().skip((page-1)*500).limit(500)
    if(!books) return res.status(204).json({"message": "No books found"})
    res.json(books)
}

const getBook = async (req: Request, res: Response) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Book ID required"})

    const book = await Book.findOne({_id: req.params.id}).exec()
    if(!book) {
        return res.status(204).json({"message": `Book ID ${req.params.id} not found`})
    }
    res.json(book)
}

module.exports = {
    getAllBooks,
    getBook,
}