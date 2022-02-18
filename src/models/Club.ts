import { Schema, model } from "mongoose"

const clubSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    club: {
        type: String,
    },
    members: [{
        member: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

module.exports = model('Club', clubSchema)
