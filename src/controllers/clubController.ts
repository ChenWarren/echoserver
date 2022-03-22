import { Request, Response } from "express"
const Club = require('../models/Club')
const User = require('../models/User')


const getClubs = async (req: Request, res: Response) => {
    let page: number = 1
    if(!req?.params?.p){
        page = 1
    } else {
        page = parseInt(req.params.p)
    }

    const clubs = await Club.find({}, "title status member_count book_count").skip((page-1)*500).limit(500)

    if(!clubs) return res.status(204).json({"message":"No clubs found"})

    res.json({"clubs": clubs})

}

const createClub = async (req:Request, res:Response) => {
    const { user, title, status, members, bookList } = req.body
    if(!user || !title || !bookList.length) return res.status(400).json({"message": "User, club title, and bookList are required."})

    const clubExistCheck = await Club.findOne({title: title}).exec() 

    if(clubExistCheck) return res.status(409).json({"message": "Clube exist!"})

    try{

        const getUser = await User.findOne({email: user}).exec()

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

        getClub.member_count = members.length
        getClub.book_count = bookList.length

        await getClub.save()

        const data = await loadBookListAsResult(title)

        res.status(201).json({"message": `Club ${title} created!`, "club": data})

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
        getClub.member_count = getClub.members.length
        await getClub.save()

        const data = await loadBookListAsResult(club)

        res.status(201).json({"message": `User ${member} join the club ${getClub.title}`, "club": data} )

    } catch (err: any){
        res.status(500).json({"message": err.message})
    }

}

const deleteMembers = async (req: Request, res: Response) => {
    const { club, user, members } = req.body

    if(!club || !user || !members.length) return res.status(400).json({"message": "Club name, user, and members are required"})

    const getClub = await Club.findOne({ title: club}).exec()
    if(!getClub) return res.status(404).json({"message": `Club ${club} is not exist!`})

    const getUserID = await User.findOne({email: user}).exec()
    if(!getUserID) return res.status(404).json({"message": "User is not exist"})

    if(getClub.host != getUserID.id) return res.status(401).json({"message": "No authorization"})

    try {

        for( let i=0; i<members.length; i++){
            if(members[i]!=user){
                const member = await User.findOne({email: members[i]}).exec()
                const findID = await getClub.members.find((m:any)=> m.memberID == member.id)
                await getClub.members.id(findID).remove()
            }
        }
        getClub.member_count = getClub.members.length
        await getClub.save()

        const data = await loadBookListAsResult(club)

        res.status(201).json({"message": `Club ${getClub.title} member updated`, "club": data} )

    } catch (err: any) {
        res.status(500).json({"message": err.message})
    }

}

const addClubBooks = async (req: Request, res: Response) => {
    const { club, user, bookID } = req.body
    if(!club || !user || !bookID.length) return res.status(400).json({"message": "Club name, user, and book ID are required."})

    const getClub = await Club.findOne({ title: club}).exec()
    if(!getClub) return res.status(404).json({"message": `Club ${club} is not exist!`})

    const getUserID = await User.findOne({email: user}).exec()
    if(!getUserID) return res.status(404).json({"message": "User is not exist"})

    const checkUser = await getClub.members.find((m:any)=>m.memberID == getUserID.id)
    if(!checkUser) return res.status(401).json({"message": "No authorization"})

    try {
        for(let i=0; i<bookID.length; i++){
            const findBookID = await getClub.bookList.find((b:any)=>b.memberID == bookID[i])
            if(!findBookID) {
                await getClub.bookList.push({bookID: bookID[i]})
            }
        }

        getClub.book_count = getClub.bookList.length
        await getClub.save()

        const data = await loadBookListAsResult(club)

        res.status(201).json({"message": `Club ${getClub.title} book list updated`, "club": data})

    } catch (err:any) {
        res.status(500).json({"message": err.message})
    }
}

const deleteClubBooks = async (req: Request, res: Response) => {
    const { club, user, bookID } = req.body
    if(!club || !user || !bookID.length) return res.status(400).json({"message": "Club name, user, and book ID are required."})

    const getClub = await Club.findOne({ title: club}).exec()
    if(!getClub) return res.status(404).json({"message": `Club ${club} is not exist!`})

    const getUserID = await User.findOne({email: user}).exec()
    if(!getUserID) return res.status(404).json({"message": "User is not exist"})

    if(getClub.host != getUserID.id) return res.status(401).json({"message": "No authorization"})

    try{
        for(let i=0; i<bookID.length; i++){
            const findBook = await getClub.bookList.find((b:any)=>b.bookID == bookID[i])
            if(findBook){
                await getClub.bookList.id(findBook._id).remove()
            }
        }

        await getClub.save()

        const data = await loadBookListAsResult(club)

        res.status(201).json({"message": `Club ${getClub.title} book list updated`, "club": data})

    } catch(err:any){
        res.status(500).json({"message": err.message})
    }

}

const loadBookListAsResult = async (key: string) => {
    const returnData = await Club.findOne({title: key}).populate("host", "username email").populate({ path: "members", populate: { path: "memberID", select: "username email"}}).populate({ path: "bookList", populate: { path: "bookID", select: "title authors pub_year"}}).exec()

    return returnData
}

module.exports = { getClubs, createClub, addMembers, deleteMembers, addClubBooks, deleteClubBooks }