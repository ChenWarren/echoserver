import { Router } from "express"
const router = Router()
const { addReadbook, getReadBooks, deleteReadBook} = require('../controllers/readbookController')

router.post('/add', addReadbook)
router.post('/', getReadBooks)
router.delete('/delete', deleteReadBook)

module.exports = router