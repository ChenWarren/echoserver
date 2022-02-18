import { Schema, model } from "mongoose"

const favobookSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    favobooks: [{
        favobook: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    }]
})

module.exports = model('FavBook', favobookSchema)
