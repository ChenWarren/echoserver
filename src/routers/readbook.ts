import { Router } from "express"
const router = Router()
const { addReadbook, updateReadBooks, getReadBooks, deleteReadBook} = require('../controllers/readbookController')

router.post('/add', addReadbook)
router.post('/', getReadBooks)
router.delete('/delete', deleteReadBook)
router.put('/update', updateReadBooks)

module.exports = router