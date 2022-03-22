"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getAllUsers, getOneUser, getOneUserAndDelete, getOneUserAndDeleteByID, getOneUserAndDeleteByEmail } = require('../controllers/usersController');
const router = (0, express_1.Router)();
router.get('/', getAllUsers);
router.get('/findUserByUserName/:username', getOneUser);
router.post('/userDeleteByUsername/:username', getOneUserAndDelete);
router.post('/userDeleteById/:id', getOneUserAndDeleteByID);
router.post('/userDeleteByEmail/:email', getOneUserAndDeleteByEmail);
module.exports = router;
