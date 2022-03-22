import { Request, Response } from "express"
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body
    
    if( !email || !password ) return res.status(400).json({"message":"Email, password are required."})

    const foundAccount = await User.findOne({
        email: email 
    }).exec()
    if(!foundAccount) return res.status(404).json({"message": "User not found"})

    const match = await bcrypt.compare(password, foundAccount.password)
    if(match){
        const accessTk = jwt.sign(
            { "user": foundAccount.email },
            process.env.ACCESS_TOKEN_CODE,
            { expiresIn: '1h'}
        )
        const refreshTk = jwt.sign(
            { "user": foundAccount.email },
            process.env.REFRESH_TOKEN_CODE,
            { expiresIn: '1d'}
        )
        foundAccount.refreshToken = refreshTk
        const result = await foundAccount.save()

        res.cookie('jwt', refreshTk, { httpOnly: true, sameSite: 'none', maxAge: 24*60*60*1000 })
        res.json({accessTk})
    } else {
        res.sendStatus(401).json({"message": "Unauthorized"})
    }
}

module.exports = { loginHandler }