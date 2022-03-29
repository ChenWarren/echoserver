"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const conn = require('./config/dbConn');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
// conn to db
conn();
// request log
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// routes
app.use('/static', express.static(path.join(__dirname, 'uploads')));
app.use('/', require('./routers/root'));
app.use('/register', require('./routers/userRegister'));
app.use('/auth', require('./routers/auth'));
app.use('/refresh', require('./routers/refreshTK'));
app.use('/logout', require('./routers/logout'));
app.use(verifyJWT);
app.use('/user', require('./routers/user'));
app.use('/upload', require('./routers/uploadFile'));
app.use('/books', require('./routers/books'));
app.use('/admin/users', require('./routers/usersAdmin'));
app.use('/review', require('./routers/review'));
app.use('/favobook', require('./routers/favobook'));
app.use('/readbook', require('./routers/readbook'));
app.use('/club', require('./routers/club'));
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
