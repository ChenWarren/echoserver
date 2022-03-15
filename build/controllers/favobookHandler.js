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
const FavBook = require('../models/FavBook');
const User = require('../models/User');
const addFavobook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, bookID } = req.body;
    if (!user || !bookID.length)
        return res.status(400).json({ 'message': 'User and book ID are required.' });
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const favobookOwnerCheck = yield FavBook.findOne({ userID: userID }).exec();
    if (favobookOwnerCheck) {
        try {
            for (let i = 0; i < bookID.length; i++) {
                const favobookCheck = yield favobookOwnerCheck.favobooks.find((b) => b.bookID == bookID[i]);
                if (!favobookCheck) {
                    yield favobookOwnerCheck.favobooks.push({ bookID: bookID[i] });
                }
            }
            yield favobookOwnerCheck.save((err, books) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    res.status(500).json({ "message": err.message });
                const returnFavoBooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
                res.status(200).json({ "message": "Favourite book added.", "favobooks": returnFavoBooks });
            }));
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
    else {
        try {
            const result = yield FavBook.create({
                "userID": userID,
                "favobooks": []
            });
            for (let i = 0; i < bookID.length; i++) {
                yield result.favobooks.push({ bookID: bookID[i] });
            }
            yield result.save();
            const returnFavoBooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
            res.status(201).json({ "message": `New favourite book ${bookID} added!`, "favobooks": returnFavoBooks });
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
});
const getFavoBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    if (!user)
        return res.status(400).json({ 'message': 'User ID is required.' });
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const favobookOwnerCheck = yield FavBook.findOne({ userID: userID }).exec();
    if (!favobookOwnerCheck)
        return res.status(404).json({ "message": `${userID} don't has a favourite book list.` });
    try {
        const favobooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
        res.status(200).json({ "message": "Success", "favobooks": favobooks });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const deleteFavoBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, bookID } = req.body;
    if (!user || !bookID.length)
        return res.status(400).json({ 'message': 'User and book ID are required.' });
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const favobookOwnerCheck = yield FavBook.findOne({ userID: userID }).exec();
    if (favobookOwnerCheck) {
        try {
            for (let i = 0; i < bookID.length; i++) {
                const newFavoBooks = yield favobookOwnerCheck.favobooks.find((book) => book.bookID == bookID[i]);
                if (newFavoBooks) {
                    yield favobookOwnerCheck.favobooks.id(newFavoBooks._id).remove();
                }
                else {
                    return res.status(404).json({ "message": `Books are not exist in favourite book list.` });
                }
            }
            yield favobookOwnerCheck.save();
            const returnFavoBooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
            res.status(200).json({ "message": "Favourite book deleted.", "favobooks": returnFavoBooks });
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
    else {
        res.status(404).json({ "message": `${userID} don't have a favourite book list.` });
    }
});
module.exports = { addFavobook, getFavoBooks, deleteFavoBook };
