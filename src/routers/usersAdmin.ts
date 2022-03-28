import { Router } from "express"
const { getAllUsers,getOneUser,getOneUserAndDelete,getOneUserAndDeleteByID,getOneUserAndDeleteByEmail, getOneUserByEmail } = require('../controllers/adminUsersController')
const router = Router()

router.get('/', getAllUsers)
router.get('/findUserByUserName/:username', getOneUser)
router.post('/userDeleteByUsername/:username', getOneUserAndDelete)
router.post('/userDeleteById/:id', getOneUserAndDeleteByID)
router.post('/userDeleteByEmail/:email', getOneUserAndDeleteByEmail)
router.get('/finduserByEmail/:email', getOneUserByEmail)

module.exports = router