"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { getClubs, getOneClub, createClub, addMembers, deleteMembers, addClubBooks, deleteClubBooks } = require('../controllers/clubController');
router.get('/', getClubs);
router.get('/id', getOneClub);
router.post('/create', createClub);
router.post('/addmember', addMembers);
router.delete('/delmember', deleteMembers);
router.post('/addbooks', addClubBooks);
router.delete('/delbooks', deleteClubBooks);
module.exports = router;
