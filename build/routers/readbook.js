"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { addReadbook, getReadBooks, deleteReadBook } = require('../controllers/readbookController');
router.post('/add', addReadbook);
router.post('/', getReadBooks);
router.delete('/delete', deleteReadBook);
module.exports = router;
