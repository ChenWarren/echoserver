import { Router } from "express"
const router = Router()
const authController = require('../controllers/authController')

router.post('/', authController.loginHandler)

module.exports = router