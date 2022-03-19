"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getAllUsers, getOneUser } = require('../controllers/usersController');
const router = (0, express_1.Router)();
router.get('/', getAllUsers);
router.get('/username/:username', getOneUser);
module.exports = router;
