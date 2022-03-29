import { Router } from "express"
const { getAllBooks, getOneBook, searchBooks } = require('../controllers/booksController')
const router = Router()

router.get('/all', getAllBooks)
router.get('/id', getOneBook)
router.get('/search', searchBooks)

module.exports = router