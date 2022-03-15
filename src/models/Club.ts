import { Schema, model } from "mongoose"

const clubBookListSchema = new Schema({
    bookID: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    like_count: {
        type: Number,
        default: 0,
    },
})

const clubMember = new Schema({
    memberID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const clubSchema = new Schema({
    host: {
        type: Schema.Types.ObjectId,
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
})

module.exports = model('Club', clubSchema)
