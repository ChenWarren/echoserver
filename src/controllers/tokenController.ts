import { Request, Response } from "express"
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const tokenHandler = async ( req: Request, res: Response) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({"message": "Unauthorized"})
    const refreshTK = cookies.jwt
    
    try{
        const findUser = await User.findOne({refreshToken: refreshTK}).exec()
        if(!findUser) return res.status(401).json({"message": "Unauthorized"})
        jwt.verify(
            refreshTK,
            process.env.REFRESH_TOKEN_CODE,
            (err:any, decode:any) => {
                if(err || findUser.email !== decode.user) return res.sendStatus(403).json({"message": "Forbiden"})
                const accessTK = jwt.sign(
                    { "user": findUser.email },
                    process.env.ACCESS_TOKEN_CODE,
                    { expiresIn: '1h'}
                )
                res.json({accessTK})
            }
        )

    } catch (err: any){
        res.status(500).json({"message": err.message})
    }
}

module.exports = { tokenHandler }