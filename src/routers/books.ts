import { Router } from "express"
const { getAllBooks, getOneBook } = require('../controllers/booksController')
const router = Router()

router.get('/:p', getAllBooks)
router.get('/id/:id', getOneBook)

module.exports = router