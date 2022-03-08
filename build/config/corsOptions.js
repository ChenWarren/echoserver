"use strict";
const wl = require('./whiteList');
const corsOptions = {
    origin: (origin, callback) => {
        if (wl.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};
module.exports = corsOptions;
