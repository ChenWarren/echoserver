"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getAllBooks, getOneBook, searchBooks } = require('../controllers/booksController');
const router = (0, express_1.Router)();
router.get('/all', getAllBooks);
router.get('/id', getOneBook);
router.get('/search', searchBooks);
module.exports = router;
