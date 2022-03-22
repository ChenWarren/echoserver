"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { tokenHandler } = require('../controllers/tokenController');
router.get('/', tokenHandler);
module.exports = router;
