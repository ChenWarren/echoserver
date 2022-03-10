"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const favobookHandler = require('../controllers/favobookHandler');
router.post('/add', favobookHandler.addFavobook);
router.post('/', favobookHandler.getFavoBooks);
module.exports = router;
