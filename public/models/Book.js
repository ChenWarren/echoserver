"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    isbn: {
        type: String
    },
    title: {
        type: String
    },
    authors: {
        type: String
    },
    pub_year: {
        type: Number
    },
    publisher: {
        type: String
    },
    image_s: {
        type: String
    },
    image_m: {
        type: String
    },
    image_l: {
        type: String
    }
});
module.exports = (0, mongoose_1.model)('Book', bookSchema);
