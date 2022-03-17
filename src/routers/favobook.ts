import { Router } from "express"
const router = Router()
const favobookHandler = require('../controllers/favobookController')

router.post('/add', favobookHandler.addFavobook)
router.post('/', favobookHandler.getFavoBooks)
router.delete('/delete', favobookHandler.deleteFavoBook)


module.exports = router