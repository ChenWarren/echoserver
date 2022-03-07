import { Request, Response } from "express"
const User = require('../models/User')
const bcrypt = require('bcrypt')

const userInfoUpdate = async (req: Request, res: Response) => {
    res.status(201).json({"message": "Update user info."})
}

module.exports = { userInfoUpdate }