import { Router } from "express"
const router = Router()
const { 
    getClubs, 
    createClub, 
    addMembers,
    deleteMembers 
} = require('../controllers/clubController')


router.get('/', getClubs)
router.post('/create', createClub)
router.post('/addmember', addMembers)
router.delete('/delmember', deleteMembers)

module.exports = router