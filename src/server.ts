require('dotenv').config()
import express from 'express'
const app = express()
const PORT = 3500
const mongoose = require('mongoose')

const conn = require('./config/dbConn')
const {logger} = require('./middleware/logEvents')

// conn to db
conn()

// request log
app.use(logger)

const root = require('./routers/root')

app.use(express.json())

app.use(root)


mongoose.connection.once('open', () => {
    console.log('Connected to db')
    app.listen(PORT, ()=> {
        console.log(`Server running on port: ${PORT}`);  
    })
})