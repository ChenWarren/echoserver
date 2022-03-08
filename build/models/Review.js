"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book'
    },
    reviews: [{
            review: {
                type: String,
            },
            rating: {
                type: Number,
            },
            owner: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
});
module.exports = (0, mongoose_1.model)('Review', reviewSchema);
