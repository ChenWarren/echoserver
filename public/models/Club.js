"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clubSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    club: {
        type: String,
    },
    members: [{
            member: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
});
module.exports = (0, mongoose_1.model)('Club', clubSchema);
