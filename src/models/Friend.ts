import { Schema, model } from "mongoose"
import { ObjectId } from "mongodb"
const { User } = require('./User')

const friendSchema = new Schema({
    f_count: {
        type: Number
    },
    friends: [{
        friend: {
            type: ObjectId,
            ref: User,
        }
    }]
})

module.exports = model('Friend', friendSchema)
