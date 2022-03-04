import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    account: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    refreshToken: String
})

module.exports = model('User', userSchema)