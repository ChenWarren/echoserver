import {Router} from 'express'
const router = Router()
const { userInfoUpdate, userDetail } = require('../controllers/userController')

router.put('/update', userInfoUpdate)
router.get('/detail', userDetail)

module.exports = router