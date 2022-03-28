"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { userInfoUpdate, userDetail } = require('../controllers/userController');
router.put('/update', userInfoUpdate);
router.get('/detail', userDetail);
module.exports = router;
