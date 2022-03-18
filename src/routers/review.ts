import { add } from 'date-fns'
import { Router } from 'express'
const router = Router()
const { getReviews, addReview, updateReview, delReview } = require('../controllers/reviewController')

router.get('/:id', getReviews)
router.post('/add', addReview)
router.put('/update', updateReview)
router.delete('/delete', delReview)

module.exports = router