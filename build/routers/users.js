"use strict";
exports.__esModule = true;
var express_1 = require("express");
var _a = require('../controllers/usersController'), getAllUsers = _a.getAllUsers, getOneUser = _a.getOneUser;
var router = (0, express_1.Router)();
router.get('/', getAllUsers);
router.get('/username/:username', getOneUser);
module.exports = router;
