import { Router } from "express"
const router = Router()
const favobookHandler = require('../controllers/favobookHandler')

router.post('/', favobookHandler.addFavobook)


module.exports = router