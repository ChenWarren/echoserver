"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userUpdateController = require('../controllers/userUpdateControl');
router.post('/', userUpdateController.userInfoUpdate);
module.exports = router;
