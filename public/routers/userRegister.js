"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const registerController = require('../controllers/userRegisterControl');
router.post('/', registerController.registerNewUser);
module.exports = router;
