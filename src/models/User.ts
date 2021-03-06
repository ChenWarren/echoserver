import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    email: {
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
    image_s: {
        type: String,
        default: 'default-user-image.jpg'
    },
    gender: {
        type: String,
    },
    age: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    user_id: {
        type: Number,
    },
    refreshToken: String
})

module.exports = model('User', userSchema)