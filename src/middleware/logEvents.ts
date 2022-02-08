const { format } = require('date-fns')
const { v4: uuid} = require('uuid')
import { Request, Response } from "express"

const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')
const logFile = 'reqLog.txt'


const logEvents = async (m:string, file:string) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss;')
    const logItem =` ${dateTime}\t${m}`

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', file), logItem)

    } catch (err) {
        console.log(err)
    }
    
}

const logger = (req: Request, res: Response, next: Function) => {
    const msg = `Method: ${req.method};\tOrigin: ${req.headers.origin};\tTarget: ${req.url};\n`
    logEvents(msg, logFile)
    next()
}

module.exports = { logger, logEvents }

