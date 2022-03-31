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
const ReadBook = require('../models/ReadBook');
const User = require('../models/User');
const addReadbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, bookID } = req.body;
    if (!user || !bookID.length)
        return res.status(400).json({ 'message': 'User and book ID are required.' });
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const readbookOwnerCheck = yield ReadBook.findOne({ userID: userID }).exec();
    if (readbookOwnerCheck) {
        try {
            for (let i = 0; i < bookID.length; i++) {
                const readbookCheck = yield readbookOwnerCheck.readbooks.find((b) => b.bookID == bookID[i]);
                if (!readbookCheck) {
                    yield readbookOwnerCheck.readbooks.push({ bookID: bookID[i] });
                }
            }
            yield readbookOwnerCheck.save((err, books) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    res.status(500).json({ "message": err.message });
                const returnReadBooks = yield ReadBook.findOne({ userID: userID }).populate({ path: 'readbooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
                res.status(201).json({ "message": "Read book added.", "readbooks": returnReadBooks });
            }));
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
    else {
        try {
            const result = yield ReadBook.create({
                "userID": userID,
                "readbooks": []
            });
            for (let i = 0; i < bookID.length; i++) {
                yield result.readbooks.push({ bookID: bookID[i] });
            }
            yield result.save();
            const returnFavoBooks = yield ReadBook.findOne({ userID: userID }).populate({ path: 'readbooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
            res.status(201).json({ "message": `New read book ${bookID} added!`, "readbooks": returnFavoBooks });
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
});
const updateReadBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, bookID } = req.body;
    if (!user)
        return res.status(400).json({ 'message': 'User is required.' });
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    try {
        const getList = yield ReadBook.findOne({ userID: userID }).exec();
        getList.readbooks = [];
        for (let i = 0; i < bookID.length; i++) {
            yield getList.readbooks.push({ bookID: bookID[i] });
        }
        yield getList.save();
        res.status(201).json({ "message": `Read book updated!` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const getReadBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    if (!user)
        return res.status(400).json({ 'message': 'User ID is required.' });
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const readbookOwnerCheck = yield ReadBook.findOne({ userID: userID }).exec();
    if (!readbookOwnerCheck)
        return res.status(404).json({ "message": `${userID} don't has a read book list.` });
    try {
        const readbooks = yield ReadBook.findOne({ userID: userID }).populate({ path: 'readbooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
        res.status(200).json({ "message": "Success", "readbooks": readbooks });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const deleteReadBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, bookID } = req.body;
    if (!user || !bookID.length)
        return res.status(400).json({ 'message': 'User and book ID are required.' });
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const readbookOwnerCheck = yield ReadBook.findOne({ userID: userID }).exec();
    if (readbookOwnerCheck) {
        try {
            for (let i = 0; i < bookID.length; i++) {
                const newReadBooks = yield readbookOwnerCheck.readbooks.find((book) => book.bookID == bookID[i]);
                if (newReadBooks) {
                    yield readbookOwnerCheck.readbooks.id(newReadBooks._id).remove();
                }
            }
            yield readbookOwnerCheck.save();
            const returnReadBooks = yield ReadBook.findOne({ userID: userID }).populate({ path: 'readbooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
            res.status(200).json({ "message": "Read book deleted.", "readbooks": returnReadBooks });
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
    else {
        res.status(404).json({ "message": `${userID} don't have a read book list.` });
    }
});
module.exports = { addReadbook, updateReadBooks, getReadBooks, deleteReadBook };
