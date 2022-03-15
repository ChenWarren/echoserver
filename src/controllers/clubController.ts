import { Request, Response } from "express"
const Club = require('../models/Club')

const createClub =async (req:Request, res:Response) => {
    const { host, title, status, members, bookList } = req.body
    if(!host || !title || !bookList.length) return res.status(400).json({"message": "User, club title, and bookList are required."})

    const clubExistCheck = await Club.findOne({title: title}).exec() 

    if(clubExistCheck) return res.status(409).json({"message": "Clube exist!"})

    try{
        const result = await Club.create({
            "host": host,
            "title": title,
            "create_date": Date.now(),
            "status": status,
            "members": [],
            "bookList": [],
        })

        const getClub = await Club.findOne({title: title}).exec()
        for( let i=0; i<members.length; i++){
            await getClub.members.push({ memberID: members[i]})
        }

        for( let i=0; i<bookList.length; i++){
            await getClub.bookList.push({ bookID: bookList[i], like_count: 0})
        }
        
        await getClub.save()

        const returnClub = await Club.findOne({title: title}).populate({ path: "members", populate: { path: "memberID", select: "username"}}).populate({ path: "bookList", populate: { path: "bookID", select: "title authors pub_year"}}).exec()

        res.status(201).json({"message": `Club ${title} created!`, "club": returnClub})

    } catch(err: any){
        res.status(500).json({"message": err.message})
    }
}



module.exports = { createClub }