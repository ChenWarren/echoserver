"use strict";
exports.__esModule = true;
require('dotenv').config();
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3500;
var mongoose = require('mongoose');
var cors = require('cors');
var corsOptions = require('./config/corsOptions');
var conn = require('./config/dbConn');
var logger = require('./middleware/logEvents').logger;
var errorHandler = require('./middleware/errorHandler');
var verifyJWT = require('./middleware/verifyJWT');
// conn to db
conn();
// request log
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
// routes
app.use('/', require('./routers/root'));
app.use('/register', require('./routers/userRegister'));
app.use('/auth', require('./routers/auth'));
// app.use(verifyJWT)
app.use('/upload', require('./routers/uploadFile'));
app.use('/update', require('./routers/userUpdate'));
app.use('/books', require('./routers/books'));
app.use('/users', require('./routers/users'));
app.use('/review', require('./routers/review'));
app.use('/favobook', require('./routers/favobook'));
app.use('/readbook', require('./routers/readbook'));
app.use('/club', require('./routers/club'));
app.all('*', function (req, res) {
    res.status(404).send('404 Not Found');
});
// error handler
app.use(errorHandler);
mongoose.connection.once('open', function () {
    console.log('Connected to db');
    app.listen(PORT, function () {
        console.log("Server running on port: ".concat(PORT));
    });
});
