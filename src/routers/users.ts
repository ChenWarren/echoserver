import { Router } from "express"
const { getAllUsers,getOneUser } = require('../controllers/usersController')
const router = Router()

router.get('/', getAllUsers)
router.get('/username/:username', getOneUser)

module.exports = router