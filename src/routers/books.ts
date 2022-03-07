import { Router } from "express"
const { getAllBooks, getBook } = require('../controllers/booksController')
const router = Router()

router.get('/:p', getAllBooks)
router.get('/:id', getBook)

module.exports = router