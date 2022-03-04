import { Request, Response, NextFunction } from "express"
const jwt = require('jsonwebtoken')

const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader: any = req.headers.authorization || req.headers.Authorization
    
    if(!authHeader?.startsWith("Bearer")) return res.sendStatus(401)
    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_CODE,
        (err: any, decode: any) => {
            if(err) return res.sendStatus(403)
            req.user = decode.user
            next()
        }
    )
}

module.exports = verifyJWT