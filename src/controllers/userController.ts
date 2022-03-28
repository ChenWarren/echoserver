import { Request, Response } from "express"
const User = require('../models/User')
const bcrypt = require('bcrypt')

const userDetail = async (req: Request, res: Response) => {
    const { user } = req.body

    console.log(user)

    try {
        const getUser = await User.findOne({ email: user}, "email username image_s country state gender age").exec()
        if(!getUser) res.status(204).json({"message": "User not found"})

        res.json({"user": getUser})

    } catch (err: any) {
        res.status(500).json({"message": err.message})
    }

}

const userInfoUpdate = async (req: Request, res: Response) => {
    const { email, username, password, gender, age, country, state, user_id } = req.body

    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const result = await User.findOneAndUpdate({email: email}, {
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

module.exports = { userInfoUpdate, userDetail }