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
const createClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { host, title, status, members, bookList } = req.body;
    if (!host || !title || !bookList.length)
        return res.status(400).json({ "message": "User, club title, and bookList are required." });
    const clubExistCheck = yield Club.findOne({ title: title }).exec();
    if (clubExistCheck)
        return res.status(409).json({ "message": "Clube exist!" });
    try {
        const result = yield Club.create({
            "host": host,
            "title": title,
            "create_date": Date.now(),
            "status": status,
            "members": [],
            "bookList": [],
        });
        const getClub = yield Club.findOne({ title: title }).exec();
        for (let i = 0; i < members.length; i++) {
            yield getClub.members.push({ memberID: members[i] });
        }
        for (let i = 0; i < bookList.length; i++) {
            yield getClub.bookList.push({ bookID: bookList[i], like_count: 0 });
        }
        yield getClub.save();
        const returnClub = yield Club.findOne({ title: title }).populate({ path: "members", populate: { path: "memberID", select: "username" } }).populate({ path: "bookList", populate: { path: "bookID", select: "title authors pub_year" } }).exec();
        res.status(201).json({ "message": `Club ${title} created!`, "club": returnClub });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = { createClub };
