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
            date: {
                type: Date,
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
    rv_count: {
        type: Number
    },
    av_rating: {
        type: Number,
        default: 0
    },
    rt_count: {
        type: Number
    }
});
module.exports = (0, mongoose_1.model)('Review', reviewSchema);
