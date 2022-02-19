import { Router } from "express"
const router = Router()
const favobookHandler = require('../controllers/favobookHandler')

router.post('/add', favobookHandler.addFavobook)


module.exports = router