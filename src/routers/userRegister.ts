import express from 'express'
const router = express.Router()
const registerController = require('../controllers/userRegisterControl')

router.post('/', registerController.registerNewUser)

module.exports = router