const { format } = require('date-fns')
const { v4: uuid} = require('uuid')
import { Request, Response } from "express"

const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')
const logFile: string = 'reqLog.txt'


const logEvents = async (m:string, u:string) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss;')
    const logItem =` ${dateTime}\tMethod: ${m};\tURL: ${u};\n`

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logItem)

    } catch (err) {
        console.log(err)
    }
    
}

const logger = (req: Request, res: Response, next: Function) => {
    logEvents(req.method, req.url)
    next()
}

module.exports = { logger, logEvents }

