import { Schema, model } from "mongoose"

const bookListSchema = new Schema({
    bookID: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    } 
})

const readbookSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    readbooks: [ bookListSchema ]
})

module.exports = model('ReadBook', readbookSchema)
