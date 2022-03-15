import { Request, Response } from "express"
const User = require('../models/User')
const bcrypt = require('bcrypt')

const registerNewUser = async (req: Request, res: Response) => {
    const { email, username, password, gender, age, country, state, user_id } = req.body

    if(!email || !username || !password || !country || !state) return res.status(400).json({'message':'Account, username, password, country, and state are required.'})

    const accountCheck = await User.findOne({ email: email }).exec()
    const usernameCheck = await User.findOne({ username: username }).exec()
    if(accountCheck) return res.status(409).json({'message': 'Account exist!'})
    if(usernameCheck) return res.status(409).json({'message': 'Username exist!'})

    try{
        const hashedPwd = await bcrypt.hash(password, 10)
        const result = await User.create({
            "email": email,
            "username": username,
            "password": hashedPwd,
            "country": country, 
            "state": state,
            "user_id": user_id,
            "gender": gender,
            "age": age
        })

        // console.log(result);
        

        res.status(201).json({'message': `New user ${username} created!`})

    } catch(err: any) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = { registerNewUser }