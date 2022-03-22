import { exec } from "child_process"
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
const getOneUserAndDelete = async (req: Request, res: Response) => {
    let username: string = ''
    if(!req?.params?.username) return res.status(400).json({"message": "Username required"})
    username = req.params.username
    const user = await User.findOneAndDelete({username} ).exec()
    if(!user) {
         res.json({message: `Username ${req.params.username} not found`})
    }else{
    res.json({
        message: `The user ${req.params.username} deleted Successfully`
})}
}
const getOneUserAndDeleteByID = async (req: Request, res: Response) => {
    let _id: string = ''
    if(!req?.params?.id) return res.status(400).json({"message": "id required"})
    _id = req.params.id
    const user = await User.findByIdAndDelete({_id} ).exec()
    if(!user) {
        res.json({message: `id ${req.params.id} not found`})
    }else{
    res.json({
        message: `The user ${req.params.id} deleted Successfully`
})}
}
const getOneUserAndDeleteByEmail = async (req: Request, res: Response) => {
    let email: string = ''
    if(!req?.params?.email) return res.status(400).json({"message": "email required"})
    email = req.params.email
    const user= await User.findOneAndDelete({email}).exec()

    if(!user) {
        res.json({message: `email ${req.params.email} not found`})
    }else{
    res.json({
        message: `The user ${req.params.email} deleted Successfully`
})}
}

module.exports = {
    getAllUsers,
    getOneUser,
    getOneUserAndDelete,
    getOneUserAndDeleteByID,
    getOneUserAndDeleteByEmail

}