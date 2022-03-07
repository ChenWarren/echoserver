import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
    isbn: {
        type: String
    },
    title: {
        type: String
    },
    authors: {
        type: String
    },
    pub_year: {
        type: Number
    },
    publisher: {
        type: String
    },
    image_s: {
        type: String
    },
    image_m: {
        type: String
    },
    image_l: {
        type: String
    }
})

module.exports = model('Book', bookSchema)