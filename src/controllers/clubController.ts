import { Request, Response } from "express"
const Club = require('../models/Club')
const User = require('../models/User')

const createClub =async (req:Request, res:Response) => {
    const { host, title, status, members, bookList } = req.body
    if(!host || !title || !bookList.length) return res.status(400).json({"message": "User, club title, and bookList are required."})

    const clubExistCheck = await Club.findOne({title: title}).exec() 

    if(clubExistCheck) return res.status(409).json({"message": "Clube exist!"})

    try{

        const getUser = await User.findOne({email: host}).exec()

        const result = await Club.create({
            "host": getUser.id,
            "title": title,
            "create_date": Date.now(),
            "status": status,
            "members": [],
            "bookList": [],
        })

        const getClub = await Club.findOne({title: title}).exec()
        for( let i=0; i<members.length; i++){
            const getMember = await User.findOne({email: members[i]}).exec()
            await getClub.members.push({ memberID: getMember.id})
        }

        for( let i=0; i<bookList.length; i++){
            await getClub.bookList.push({ bookID: bookList[i], like_count: 0})
        }
        
        await getClub.save()

        const returnClub = await Club.findOne({title: title}).populate("host", "username email").populate({ path: "members", populate: { path: "memberID", select: "username email"}}).populate({ path: "bookList", populate: { path: "bookID", select: "title authors pub_year"}}).exec()

        res.status(201).json({"message": `Club ${title} created!`, "club": returnClub})

    } catch(err: any){
        res.status(500).json({"message": err.message})
    }
}

const addMembers = async (req: Request, res: Response) => {
    const { club, member } = req.body
    if(!club || !member) return res.status(400).json({"message": "Club name and member's email are required."})

    const getClub = await Club.findOne({ title: club}).exec()
    if(!getClub) return res.status(404).json({"message": `Club ${club} is not exist!`})

    const getMember = await User.findOne({email: member}).exec()
    const getMemberID = getMember.id

    const checkMembership = await getClub.members.find((m:any)=>m.memberID == getMemberID)

    if(checkMembership) return res.status(409).json({"message": "User already exist."})

    try {
        await getClub.members.push({memberID: getMemberID})
        await getClub.save()

        const returnClub = await Club.findOne({title: club}).populate("host", "username email").populate({ path: "members", populate: { path: "memberID", select: "username email"}}).populate({ path: "bookList", populate: { path: "bookID", select: "title authors pub_year"}}).exec()

        res.status(201).json({"message": `User ${member} join the club ${getClub.title}`, "club": returnClub} )

    } catch (err: any){
        res.status(500).json({"message": err.message})
    }

}



module.exports = { createClub, addMembers }