"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookListSchema = new mongoose_1.Schema({
    bookID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book'
    }
});
const favobookSchema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    favobooks: [bookListSchema]
});
module.exports = (0, mongoose_1.model)('FavBook', favobookSchema);
