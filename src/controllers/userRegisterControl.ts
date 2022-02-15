import { Request, Response } from "express"
const User = require('../models/User')
const bcrypt = require('bcrypt')

const registerNewUser = async (req: Request, res: Response) => {
    const { account, username, pwd, location } = req.body
    if(!account || !username || !pwd || !location.country || !location.state) return res.status(400).json({'message':'Acount, username, password, country, and state are required.'})

    const accountCheck = await User.findOne({ account: account }).exec()
    const usernameCheck = await User.findOne({ username: username }).exec()
    if(accountCheck) return res.status(409).json({'message': 'Account exist!'})
    if(usernameCheck) return res.status(409).json({'message': 'Username exist!'})

    try{
        const hashedPwd = await bcrypt.hash(pwd, 10)
        const result = await User.create({
            "account": account,
            "username": username,
            "password": hashedPwd,
            "location": { "country": location.country, "state": location.state}
        })

        res.status(201).json({'message': `New user ${username} created!`})

    } catch(err:any) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = { registerNewUser }