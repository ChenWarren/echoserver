import { Router } from "express"
const router = Router()
const { createClub } = require('../controllers/clubController')

router.post('/create', createClub)

module.exports = router