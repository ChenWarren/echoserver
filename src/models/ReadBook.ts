import { Schema, model } from 'mongoose'

const readbookSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    readbooks: [{
        readbook: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    }]    
})

module.exports = model('ReadBook', readbookSchema)