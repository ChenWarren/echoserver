import { Request, Response } from "express"
const User = require('../models/User')

const getAllUsers = async (req: Request, res: Response) => {
  
    const Users = await User.find({})
    if(!Users) return res.status(204).json({"message": "No Users found"})
    res.json({"Users": Users})
}

const getOneUser = async (req: Request, res: Response) => {
    let username: string = ''
    if(!req?.params?.username) return res.status(400).json({"message": "Username required"})
    username = req.params.username
    const user = await User.findById(username).exec()
    if(!user) {
        return res.status(204).json({"message": `Username ${req.params.username} not found`})
    }
    res.json({"user":user})
}

module.exports = {
    getAllUsers,
    getOneUser,
}