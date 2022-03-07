"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getAllBooks, getBook } = require('../controllers/booksController');
const router = (0, express_1.Router)();
router.get('/:p', getAllBooks);
router.get('/:id', getBook);
module.exports = router;
