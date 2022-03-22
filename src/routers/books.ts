import { Router } from "express"
const { getAllBooks, getOneBook, searchBooks } = require('../controllers/booksController')
const router = Router()

router.get('/all/:p', getAllBooks)
router.get('/id/:id', getOneBook)
router.get('/search', searchBooks)

module.exports = router