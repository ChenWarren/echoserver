"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const friendSchema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    friends: [{
            friend: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
            }
        }],
    f_count: {
        type: Number
    }
});
module.exports = (0, mongoose_1.model)('Friend', friendSchema);
