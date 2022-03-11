import { Router } from "express"
const router = Router()
const favobookHandler = require('../controllers/favobookHandler')

router.post('/add', favobookHandler.addFavobook)
router.post('/', favobookHandler.getFavoBooks)
router.delete('/delete', favobookHandler.deleteFavoBook)


module.exports = router