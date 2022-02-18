import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId
    },
    ISBN: {
        type: String
    }
})

module.exports = model('Book', bookSchema)