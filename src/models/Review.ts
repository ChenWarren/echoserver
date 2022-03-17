import { Schema, model } from "mongoose"

const reviewSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
})

module.exports = model('Review', reviewSchema)