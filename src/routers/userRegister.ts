import {Router} from 'express'
const router = Router()
const registerController = require('../controllers/userRegisterControl')

router.post('/', registerController.registerNewUser)

module.exports = router