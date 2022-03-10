import { Schema, model } from "mongoose"

const bookListSchema = new Schema({
    bookID: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    } 
})

const favobookSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    favobooks: [ bookListSchema ]
})

module.exports = model('FavBook', favobookSchema)
