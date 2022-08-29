"use strict";
// For single user, get, add, update, and delete theire favorite books list. 
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
// Add new books to favorite list.
const addFavobook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Chek if request with user(email) and book ids.
    const { user, bookID } = req.body;
    if (!user || !bookID.length)
        return res.status(400).json({ 'message': 'User and book ID are required.' });
    // Check if user exist has favorite book list.
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const favobookOwnerCheck = yield FavBook.findOne({ userID: userID }).exec();
    if (favobookOwnerCheck) {
        try {
            // If favorite book list exist add new books to the list.
            for (let i = 0; i < bookID.length; i++) {
                const favobookCheck = yield favobookOwnerCheck.favobooks.find((b) => b.bookID == bookID[i]);
                if (!favobookCheck) {
                    yield favobookOwnerCheck.favobooks.push({ bookID: bookID[i] });
                }
            }
            // Save new list to database and get updated list.
            yield favobookOwnerCheck.save((err, books) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    res.status(500).json({ "message": err.message });
                const returnFavoBooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
                res.status(201).json({ "message": "Favourite book added.", "favobooks": returnFavoBooks });
            }));
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
    else {
        // If favorite book list not exist, create a list and the new books.
        try {
            const result = yield FavBook.create({
                "userID": userID,
                "favobooks": []
            });
            for (let i = 0; i < bookID.length; i++) {
                yield result.favobooks.push({ bookID: bookID[i] });
            }
            yield result.save();
            // Get new created favorite book list.
            const returnFavoBooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
            res.status(201).json({ "message": `New favourite book ${bookID} added!`, "favobooks": returnFavoBooks });
        }
        catch (err) {
            res.status(500).json({ "message": err.message });
        }
    }
});
// Update favorite book list.
const updateFavoBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if request with user(email).
    const { user, bookID } = req.body;
    if (!user)
        return res.status(400).json({ 'message': 'User is required.' });
    // Get user id
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    try {
        // Find user favorite book list,  update it.
        const getList = yield FavBook.findOne({ userID: userID }).exec();
        getList.favobooks = [];
        for (let i = 0; i < bookID.length; i++) {
            yield getList.favobooks.push({ bookID: bookID[i] });
        }
        yield getList.save();
        res.status(201).json({ "message": `Favo book updated!` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
// Get user's favorite book list.
const getFavoBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if request with user(email).
    const { user } = req.body;
    if (!user)
        return res.status(400).json({ 'message': 'User ID is required.' });
    // Get user id and check if this user has a favorite book list.
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const favobookOwnerCheck = yield FavBook.findOne({ userID: userID }).exec();
    // If book list not exist response 404.
    if (!favobookOwnerCheck)
        return res.status(404).json({ "message": `${userID} don't has a favourite book list.` });
    // If book list exist, get favorite book list and book information from books database.
    try {
        const favobooks = yield FavBook.findOne({ userID: userID }).populate({ path: 'favobooks', populate: { path: 'bookID', select: 'title authors pub_year' } }).exec();
        res.status(200).json({ "message": "Success", "favobooks": favobooks });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
// Delete books from user's favorite book list.
const deleteFavoBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if request with user(email) and book ids.
    const { user, bookID } = req.body;
    if (!user || !bookID.length)
        return res.status(400).json({ 'message': 'User and book ID are required.' });
    // Find user's favorite book list.
    const getUser = yield User.findOne({ email: user }).exec();
    const userID = getUser.id;
    const favobookOwnerCheck = yield FavBook.findOne({ userID: userID }).exec();
    if (favobookOwnerCheck) {
        // If user's favorite book list exist, delete books from it.
        try {
            for (let i = 0; i < bookID.length; i++) {
                const newFavoBooks = yield favobookOwnerCheck.favobooks.find((book) => book.bookID == bookID[i]);
                if (newFavoBooks) {
                    yield favobookOwnerCheck.favobooks.id(newFavoBooks._id).remove();
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
        // If user's favorite book list not exist return error.
        res.status(404).json({ "message": `${userID} don't have a favourite book list.` });
    }
});
module.exports = {
    addFavobook,
    updateFavoBooks,
    getFavoBooks,
    deleteFavoBook,
};
