"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { getReviews, addReview } = require('../controllers/reviewController');
router.get('/:id', getReviews);
router.post('/add', addReview);
module.exports = router;
