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
const addFavobook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, bookID } = req.body;
    if (!userID || !bookID)
        return res.status(400).json({ 'message': 'User and book ID are required.' });
    const favobookOwnerCheck = yield FavBook.findOne({ userID: userID }).exec();
    if (favobookOwnerCheck) {
        const favobookCheck = yield favobookOwnerCheck.favobooks.find((b) => b.bookID == bookID);
        if (favobookCheck) {
            return res.status(409).json({ "message": "This book is already in your favourite list!" });
        }
        try {
            favobookOwnerCheck.favobooks.push({ bookID: bookID });
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
                "favobooks": [{
                        "bookID": bookID
                    }]
            });
            const returnFavoBooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
            res.status(201).json({ "message": `New favourite book ${bookID} added!`, "favobooks": returnFavoBooks });
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
});
const getFavoBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.body;
    if (!userID)
        return res.status(400).json({ 'message': 'User ID is required.' });
    try {
        const favobooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
        res.status(200).json({ "message": "Success", "favobooks": favobooks });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = { addFavobook, getFavoBooks };
