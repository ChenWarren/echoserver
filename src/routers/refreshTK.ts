import { Router } from 'express'
const router = Router()
const {tokenHandler} = require('../controllers/tokenController')

router.get('/', tokenHandler)

module.exports = router