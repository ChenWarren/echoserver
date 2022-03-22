import { Router } from "express"
const { getAllUsers,getOneUser,getOneUserAndDelete,getOneUserAndDeleteByID,getOneUserAndDeleteByEmail } = require('../controllers/usersController')
const router = Router()

router.get('/', getAllUsers)
router.get('/findUserByUserName/:username', getOneUser)
router.post('/userDeleteByUsername/:username', getOneUserAndDelete)
router.post('/userDeleteById/:id', getOneUserAndDeleteByID)
router.post('/userDeleteByEmail/:email', getOneUserAndDeleteByEmail)

module.exports = router