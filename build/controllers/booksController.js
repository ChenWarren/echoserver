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
const Book = require('../models/Book');
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let page = 1;
    if (!((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.p)) {
        page = 1;
    }
    else {
        page = parseInt(String(req.query.p));
    }
    try {
        const books = yield Book.find({}, 'title authors pub_year image_s').skip((page - 1) * 500).limit(500);
        if (!books)
            return res.status(204).json({ "message": "No books found" });
        res.json({ "books": books });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const getOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let bookID = '';
    if (!((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id))
        return res.status(400).json({ "message": "Book ID required" });
    bookID = String(req.query.id);
    try {
        const book = yield Book.findById(bookID).exec();
        if (!book) {
            return res.status(204).json({ "message": `Book ID ${req.params.id} not found` });
        }
        res.json({ "book": book });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const searchBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = String(req.query.key);
    const value = req.query.value;
    const page = req.query.page;
    console.log(key, value, page);
    if (key != 'title' && key != 'authors') {
        return res.json({ "message": "Search key involid" });
    }
    try {
        const result = yield Book.find({ [key]: { $regex: value } }).skip((page - 1) * 500).limit(500).exec();
        if (result.length != 0) {
            res.json({ "books": result });
        }
        else {
            res.json({ "books": [] });
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = {
    getAllBooks,
    getOneBook,
    searchBooks,
};
