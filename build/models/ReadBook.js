"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const readbookSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    readbooks: [{
            readbook: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Book'
            }
        }]
});
module.exports = (0, mongoose_1.model)('ReadBook', readbookSchema);
