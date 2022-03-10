import { Request, Response } from "express"
const User = require('../models/User')
const bcrypt = require('bcrypt')

const userInfoUpdate = async (req: Request, res: Response) => {
    const { id, email, username, password, gender, age, country, state, user_id } = req.body

    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const result = await User.findByIdAndUpdate(id, {
            "email": email,
            "username": username,
            "password": hashedPwd,
            "country": country, 
            "state": state,
            "user_id": user_id,
            "gender": gender,
            "age": age
        })

        res.status(200).json({"message": `User ${username}'s data updated.`})

    } catch (err: any) {
        res.status(500).json({"message": err.message})
    }
}

module.exports = { userInfoUpdate }