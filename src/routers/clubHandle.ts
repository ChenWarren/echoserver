import { Router } from "express"
const router = Router()
const { createClub, addMembers } = require('../controllers/clubController')

router.post('/create', createClub)
router.post('/addmember', addMembers)

module.exports = router