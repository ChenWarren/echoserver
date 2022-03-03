import { Request, Response } from "express"
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginHandler = async (req: Request, res: Response) => {
    const { account, pwd } = req.body
    if( !account || !pwd ) return res.status(400).json({"message":"Account, password are required."})

    const foundAccount = await User.findOne({
        account: account 
    }).exec()
    if(!foundAccount) return res.status(401)

    const match = await bcrypt.compare(pwd, foundAccount.password)
    if(match){
        const accessTk = jwt.sign(
            { "user": foundAccount.account },
            process.env.ACCESS_TOKEN_CODE,
            { expiresIn: '300s'}
        )
        const refreshTk = jwt.sign(
            { "user": foundAccount.account },
            process.env.REFRESH_TOKEN_CODE,
            { expiresIn: '1d'}
        )
        foundAccount.refreshToken = refreshTk
        const result = await foundAccount.save()

        res.cookie('jwt', refreshTk, { httpOnly: true, sameSite: 'none', maxAge: 24*60*60*1000 })
        res.json({accessTk})
    } else {
        res.sendStatus(401)
    }
}

module.exports = { loginHandler }