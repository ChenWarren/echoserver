import { Router } from "express"
const router = Router()
const {logoutHandler} = require('../controllers/logoutController')

router.get('/', logoutHandler)

module.exports = router