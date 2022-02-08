import { Request, Response } from "express"
const { logEvents } = require('./logEvents')
const errFile = 'errLog.txt'

const errorHandler = (err: any, req: Request, res: Response, next: Function) => {
    const msg = `${err.name}: ${err.message}\n`
    logEvents(msg, errFile)
    console.error(err.stack)
    res.status(500).send(err.message)
}

module.exports = errorHandler