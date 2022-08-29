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
const getClubs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let page = 1;
    if (!((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.p)) {
        page = 1;
    }
    else {
        page = parseInt(String(req.query.p));
    }
    const clubs = yield Club.find({}, "title host status member_count book_count create_date image_s").populate({ path: "host", select: "username" }).skip((page - 1) * 500).limit(500);
    if (!clubs)
        return res.status(204).json({ "message": "No clubs found" });
    res.json({ "clubs": clubs });
});
const getOneClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let clubID = '';
    if (!((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id))
        return res.status(400).json({ "message": "Club ID required" });
    clubID = String(req.query.id);
    try {
        const club = yield Club.findById(clubID).populate({ path: "host", select: "username" }).populate({ path: "bookList", populate: { path: "bookID", select: "bookID title authors" } }).populate({ path: "members", populate: { path: "memberID", select: "username image_s email" } }).exec();
        if (!club) {
            return res.status(204).json({ "message": `Club ID ${req.params.id} not found` });
        }
        res.json({ "club": club });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const createClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, title, status, members, bookList } = req.body;
    if (!user || !title || !bookList.length)
        return res.status(400).json({ "message": "User, club title, and bookList are required." });
    const clubExistCheck = yield Club.findOne({ title: title }).exec();
    if (clubExistCheck)
        return res.status(409).json({ "message": "Clube exist!" });
    try {
        const getUser = yield User.findOne({ email: user }).exec();
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
        getClub.member_count = members.length;
        getClub.book_count = bookList.length;
        yield getClub.save();
        const data = yield loadBookListAsResult(title);
        res.status(201).json({ "message": `Club ${title} created!`, "club": data });
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
        getClub.member_count = getClub.members.length;
        yield getClub.save();
        const data = yield loadBookListAsResult(club);
        res.status(201).json({ "message": `User ${member} join the club ${getClub.title}`, "club": data });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const deleteMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { club, user, members } = req.body;
    if (!club || !user || !members.length)
        return res.status(400).json({ "message": "Club name, user, and members are required" });
    const getClub = yield Club.findOne({ title: club }).exec();
    if (!getClub)
        return res.status(404).json({ "message": `Club ${club} is not exist!` });
    const getUserID = yield User.findOne({ email: user }).exec();
    if (!getUserID)
        return res.status(404).json({ "message": "User is not exist" });
    if (getClub.host != getUserID.id)
        return res.status(401).json({ "message": "No authorization" });
    try {
        for (let i = 0; i < members.length; i++) {
            if (members[i] != user) {
                const member = yield User.findOne({ email: members[i] }).exec();
                const findID = yield getClub.members.find((m) => m.memberID == member.id);
                yield getClub.members.id(findID).remove();
            }
        }
        getClub.member_count = getClub.members.length;
        yield getClub.save();
        const data = yield loadBookListAsResult(club);
        res.status(201).json({ "message": `Club ${getClub.title} member updated`, "club": data });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const addClubBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { club, user, bookID } = req.body;
    if (!club || !user || !bookID.length)
        return res.status(400).json({ "message": "Club name, user, and book ID are required." });
    const getClub = yield Club.findOne({ title: club }).exec();
    if (!getClub)
        return res.status(404).json({ "message": `Club ${club} is not exist!` });
    const getUserID = yield User.findOne({ email: user }).exec();
    if (!getUserID)
        return res.status(404).json({ "message": "User is not exist" });
    const checkUser = yield getClub.members.find((m) => m.memberID == getUserID.id);
    if (!checkUser)
        return res.status(401).json({ "message": "No authorization" });
    try {
        for (let i = 0; i < bookID.length; i++) {
            const findBookID = yield getClub.bookList.find((b) => b.memberID == bookID[i]);
            if (!findBookID) {
                yield getClub.bookList.push({ bookID: bookID[i] });
            }
        }
        getClub.book_count = getClub.bookList.length;
        yield getClub.save();
        const data = yield loadBookListAsResult(club);
        res.status(201).json({ "message": `Club ${getClub.title} book list updated`, "club": data });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const deleteClubBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { club, user, bookID } = req.body;
    if (!club || !user || !bookID.length)
        return res.status(400).json({ "message": "Club name, user, and book ID are required." });
    const getClub = yield Club.findOne({ title: club }).exec();
    if (!getClub)
        return res.status(404).json({ "message": `Club ${club} is not exist!` });
    const getUserID = yield User.findOne({ email: user }).exec();
    if (!getUserID)
        return res.status(404).json({ "message": "User is not exist" });
    if (getClub.host != getUserID.id)
        return res.status(401).json({ "message": "No authorization" });
    try {
        for (let i = 0; i < bookID.length; i++) {
            const findBook = yield getClub.bookList.find((b) => b.bookID == bookID[i]);
            if (findBook) {
                yield getClub.bookList.id(findBook._id).remove();
            }
        }
        yield getClub.save();
        const data = yield loadBookListAsResult(club);
        res.status(201).json({ "message": `Club ${getClub.title} book list updated`, "club": data });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const loadBookListAsResult = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const returnData = yield Club.findOne({ title: key }).populate("host", "username email").populate({ path: "members", populate: { path: "memberID", select: "username email" } }).populate({ path: "bookList", populate: { path: "bookID", select: "title authors pub_year" } }).exec();
    return returnData;
});
module.exports = {
    getClubs,
    getOneClub,
    createClub,
    addMembers,
    deleteMembers,
    addClubBooks,
    deleteClubBooks
};
