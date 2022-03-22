"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getAllUsers, getOneUser, getOneUserAndDelete } = require('../controllers/usersController');
const router = (0, express_1.Router)();
router.get('/', getAllUsers);
router.get('/findUserByUserName/:username', getOneUser);
router.post('/userDelete/:username', getOneUserAndDelete);
module.exports = router;
