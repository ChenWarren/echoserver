import { Router } from "express"
const router = Router()
const { 
    getClubs, 
    createClub, 
    addMembers,
    deleteMembers,
    addClubBooks,
    deleteClubBooks 
} = require('../controllers/clubController')


router.get('/', getClubs)
router.post('/create', createClub)
router.post('/addmember', addMembers)
router.delete('/delmember', deleteMembers)
router.post('/addbooks', addClubBooks)
router.delete('/delbooks', deleteClubBooks)

module.exports = router