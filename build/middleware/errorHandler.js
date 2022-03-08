"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { logEvents } = require('./logEvents');
const errFile = 'errLog.txt';
const errorHandler = (err, req, res, next) => {
    const msg = `${err.name}: ${err.message}\n`;
    logEvents(msg, errFile);
    console.error(err.stack);
    res.status(500).send(err.message);
};
module.exports = errorHandler;
