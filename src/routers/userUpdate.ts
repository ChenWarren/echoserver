import {Router} from 'express'
const router = Router()
const userUpdateController = require('../controllers/userUpdateControl')

router.put('/', userUpdateController.userInfoUpdate)

module.exports = router