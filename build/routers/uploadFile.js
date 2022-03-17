"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { uploadFile } = require('../controllers/uploadController');
router.post('/', uploadFile);
module.exports = router;
