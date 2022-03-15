"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { createClub, addMembers } = require('../controllers/clubController');
router.post('/create', createClub);
router.post('/addmember', addMembers);
module.exports = router;
