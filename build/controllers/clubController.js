"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Club = require('../models/Club');
const User = require('../models/User');
const createClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { host, title, status, members, bookList } = req.body;
    if (!host || !title || !bookList.length)
        return res.status(400).json({ "message": "User, club title, and bookList are required." });
    const clubExistCheck = yield Club.findOne({ title: title }).exec();
    if (clubExistCheck)
        return res.status(409).json({ "message": "Clube exist!" });
    try {
        const getUser = yield User.findOne({ email: host }).exec();
        const result = yield Club.create({
            "host": getUser.id,
            "title": title,
            "create_date": Date.now(),
            "status": status,
            "members": [],
            "bookList": [],
        });
        const getClub = yield Club.findOne({ title: title }).exec();
        for (let i = 0; i < members.length; i++) {
            const getMember = yield User.findOne({ email: members[i] }).exec();
            yield getClub.members.push({ memberID: getMember.id });
        }
        for (let i = 0; i < bookList.length; i++) {
            yield getClub.bookList.push({ bookID: bookList[i], like_count: 0 });
        }
        yield getClub.save();
        const returnClub = yield Club.findOne({ title: title }).populate("host", "username email").populate({ path: "members", populate: { path: "memberID", select: "username email" } }).populate({ path: "bookList", populate: { path: "bookID", select: "title authors pub_year" } }).exec();
        res.status(201).json({ "message": `Club ${title} created!`, "club": returnClub });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const addMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { club, member } = req.body;
    if (!club || !member)
        return res.status(400).json({ "message": "Club name and member's email are required." });
    const getClub = yield Club.findOne({ title: club }).exec();
    if (!getClub)
        return res.status(404).json({ "message": `Club ${club} is not exist!` });
    const getMember = yield User.findOne({ email: member }).exec();
    const getMemberID = getMember.id;
    const checkMembership = yield getClub.members.find((m) => m.memberID == getMemberID);
    if (checkMembership)
        return res.status(409).json({ "message": "User already exist." });
    try {
        yield getClub.members.push({ memberID: getMemberID });
        yield getClub.save();
        const returnClub = yield Club.findOne({ title: club }).populate("host", "username email").populate({ path: "members", populate: { path: "memberID", select: "username email" } }).populate({ path: "bookList", populate: { path: "bookID", select: "title authors pub_year" } }).exec();
        res.status(201).json({ "message": `User ${member} join the club ${getClub.title}`, "club": returnClub });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = { createClub, addMembers };
