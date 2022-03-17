"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
        type: Number,
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
    },
    refreshToken: String
});
module.exports = (0, mongoose_1.model)('User', userSchema);
