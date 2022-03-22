import { Router } from "express"
const { getAllUsers,getOneUser,getOneUserAndDelete } = require('../controllers/usersController')
const router = Router()

router.get('/', getAllUsers)
router.get('/findUserByUserName/:username', getOneUser)
router.post('/userDelete/:username', getOneUserAndDelete)

module.exports = router