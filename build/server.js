"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const conn = require('./config/dbConn');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
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
app.use('/update', require('./routers/userUpdate'));
app.use('/books', require('./routers/books'));
app.use('/favobook', require('./routers/favobookHandle'));
app.all('*', (req, res) => {
    res.status(404).send('404 Not Found');
});
// error handler
app.use(errorHandler);
mongoose.connection.once('open', () => {
    console.log('Connected to db');
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
});