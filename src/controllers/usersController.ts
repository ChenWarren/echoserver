import { Request, Response } from "express"
const User = require('../models/User')

const getAllUsers = async (req: Request, res: Response) => {
    
    const Users = await User.find({},'email username  country state gender age')
    if(!Users) return res.status(204).json({"message": "No Users found"})
    res.json({"Users": Users})
    

}

const getOneUser = async (req: Request, res: Response) => {
    let username: string = ''
    if(!req?.params?.username) return res.status(400).json({"message": "Username required"})
    username = req.params.username
    const user = await User.findOne({username},'email username  country state gender age').exec()
    if(!user) {
        return res.status(204).json({"message": `Username ${req.params.username} not found`})
    }
    res.json({
        "user":user
    // "eamil":user.email,
    // "username":user.username,
    // "country":user.country,
    // "state":user.state,
    // "gender":user.gender,
    // "age":user.age,
})
}

module.exports = {
    getAllUsers,
    getOneUser,
}