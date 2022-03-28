import {Router} from 'express'
const router = Router()
const { userInfoUpdate, userDetail } = require('../controllers/userController')

router.put('/update', userInfoUpdate)
router.post('/detail', userDetail)

module.exports = router