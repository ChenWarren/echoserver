import {Request, Response, NextFunction} from 'express'
const whiteList = require('../config/whiteList')

const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin
    if(whiteList.includes(origin)){
        res.header('Access-Control-Allow-Credentials', 'true')
    }
    next()
}

module.exports = credentials