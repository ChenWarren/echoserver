import { Router } from "express"
const router = Router()
const { uploadFile } = require('../controllers/uploadController')

router.post('/', uploadFile)

module.exports = router