require('dotenv').config()
const express = require('express')
import { Request, Response } from 'express'
const app = express()
const PORT = process.env.PORT || 3500
const mongoose = require('mongoose')

const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const conn = require('./config/dbConn')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')

// conn to db
conn()

// request log
app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

// routes
app.use('/', require('./routers/root'))
app.use('/register', require('./routers/userRegister'))
app.use('/auth', require('./routers/auth'))
// app.use(verifyJWT)
app.use('/upload', require('./routers/uploadFile'))
app.use('/update', require('./routers/userUpdate'))
app.use('/books', require('./routers/books'))
app.use('/review', require('./routers/review'))
app.use('/favobook', require('./routers/favobook'))
app.use('/club', require('./routers/club'))


app.all('*', (req: Request, res:Response) => {
    res.status(404).send('404 Not Found')
})

// error handler
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to db')
    app.listen(PORT, ()=> {
        console.log(`Server running on port: ${PORT}`);  
    })
})