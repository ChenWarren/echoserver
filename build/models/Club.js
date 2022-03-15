"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clubBookListSchema = new mongoose_1.Schema({
    bookID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book'
    },
    like_count: {
        type: Number,
        default: 0,
    },
});
const clubMember = new mongoose_1.Schema({
    memberID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const clubSchema = new mongoose_1.Schema({
    host: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
    },
    status: {
        type: String,
    },
    image_s: {
        type: String,
    },
    members: [clubMember],
    bookList: [clubBookListSchema]
});
module.exports = (0, mongoose_1.model)('Club', clubSchema);
