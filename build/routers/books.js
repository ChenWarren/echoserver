"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getAllBooks, getOneBook, searchBooks } = require('../controllers/booksController');
const router = (0, express_1.Router)();
router.get('/all/:p', getAllBooks);
router.get('/id/:id', getOneBook);
router.get('/search', searchBooks);
module.exports = router;
