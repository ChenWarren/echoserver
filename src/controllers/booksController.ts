const Book = require('../models/Book')
import { Request, Response } from "express"


const getAllBooks = async (req: Request, res: Response) => {
    let page: number = 1
    if(!req?.params?.p){
        page = 1
    } else {
        page = parseInt(req.params.p)
    }
    const books = await Book.find({},'title authors pub_year image_s').skip((page-1)*500).limit(500)
    if(!books) return res.status(204).json({"message": "No books found"})
    res.json({"books": books})
}

const getOneBook = async (req: Request, res: Response) => {
    let bookID: string = ''
    if(!req?.params?.id) return res.status(400).json({"message": "Book ID required"})
    bookID = req.params.id
    const book = await Book.findById(bookID).exec()
    if(!book) {
        return res.status(204).json({"message": `Book ID ${req.params.id} not found`})
    }
    res.json({"book":book})
}

module.exports = {
    getAllBooks,
    getOneBook,
}