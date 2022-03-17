import { add } from 'date-fns'
import { Router } from 'express'
const router = Router()
const { getReviews, addReview } = require('../controllers/reviewController')

router.get('/:id', getReviews)
router.post('/add', addReview)

module.exports = router