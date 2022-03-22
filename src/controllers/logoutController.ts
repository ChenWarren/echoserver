import { Request, Response } from "express"
const User = require('../models/User')

const logoutHandler = async ( req: Request, res: Response) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({"message": "Unauthorized"})
    const refreshTK = cookies.jwt

    try{
        const findUser = await User.findOne({refreshToken: refreshTK}).exec()
        if(!findUser){
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
            return res.status(204).json({"message": "Logout"})
        }

        findUser.refreshToken = ''
        const result = await findUser.save()

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
            return res.status(204).json({"message": "Logout"})

    }catch(err: any){
        res.status(500).json({"message": err.message})
    }
}

module.exports = {logoutHandler}