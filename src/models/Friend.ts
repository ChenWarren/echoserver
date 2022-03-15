import { Schema, model } from "mongoose"

const friendSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    friends: [{
        friend: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }],
    f_count: {
        type: Number
    }
})

module.exports = model('Friend', friendSchema)
