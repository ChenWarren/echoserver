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
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

module.exports = model('Review', reviewSchema)