require('dotenv').config()
import express from 'express'
import { Request, Response } from 'express'
const app = express()
const PORT = process.env.PORT || 3500
const mongoose = require('mongoose')

const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const conn = require('./config/dbConn')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')

// conn to db
conn()

// request log
app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

// routes
app.use('/', require('./routers/root'))


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