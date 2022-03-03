import {Router} from 'express'
const router = Router()
const userUpdateController = require('../controllers/userUpdateControl')

router.post('/', userUpdateController.userInfoUpdate)

module.exports = router