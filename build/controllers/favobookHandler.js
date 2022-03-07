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
    const { owner, favobook } = req.body;
    if (!owner || !favobook)
        return res.status(400).json({ 'message': 'User and book ID are required.' });
    const favobookOwnerCheck = yield FavBook.findOne({ owner: owner }).exec();
    if (favobookOwnerCheck) {
        const favobookCheck = favobookOwnerCheck.favobooks.find((book) => (book.favobook == favobook));
        if (favobookCheck) {
            return res.status(409).json({ "message": "This book is already in your favourite list!" });
        }
        try {
            const favoBookList = yield favobookOwnerCheck.favobooks.push(favobook);
            const result = yield FavBook.pudateOne({
                owner: owner,
                favobooks: favoBookList
            });
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
    try {
        const result = yield FavBook.create({
            "owner": owner,
            "favobooks": [
                {
                    "favobook": favobook
                }
            ]
        });
        res.status(201).json({ "message": `New favourite book ${favobook} added!` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = { addFavobook, };
