const Book = require('../models/Book')
import { Request, Response } from "express"


const getAllBooks = async (req: Request, res: Response) => {
    let page: number = 1
    if(!req?.query?.p){
        page = 1
    } else {
        page = parseInt(String(req.query.p))
    }
    try{
        const books = await Book.find({},'title authors pub_year image_s').skip((page-1)*500).limit(500)
        if(!books) return res.status(204).json({"message": "No books found"})
        res.json({"books": books})
    } catch (err: any){
        res.status(500).json({"message": err.message})
    }
}

const getOneBook = async (req: Request, res: Response) => {
    let bookID: string = ''
    if(!req?.query?.id) return res.status(400).json({"message": "Book ID required"})
    bookID = String(req.query.id)
    try {
        const book = await Book.findById(bookID).exec()
        if(!book) {
            return res.status(204).json({"message": `Book ID ${req.params.id} not found`})
        }
        res.json({"book":book})
    } catch (err: any) {
        res.status(500).json({"message": err.message})
    }
}

const searchBooks = async (req: any, res: Response) => {
    const key = String(req.query.key) 
    const value = req.query.value
    const page = req.query.page
     
    console.log(key, value, page)

    if(key!='title' && key!='authors'){
        return res.json({"message":"Search key involid"})
    }

    try{
        const result = await Book.find({[key]: {$regex: value}}).skip((page-1)*500).limit(500).exec()
        if(result.length!=0){
            res.json({"books": result})
        }else{
            res.json({"books": "The end or no result"})
        }

    }catch(err:any){
        res.status(500).json({"message": err.message})
    }
}

module.exports = {
    getAllBooks,
    getOneBook,
    searchBooks,
}