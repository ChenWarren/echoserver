// For single user, get, add, update, and delete theire favorite books list. 

import { Request, Response } from "express"
const FavBook = require('../models/FavBook')
const User = require('../models/User')


// Add new books to favorite list.
const addFavobook = async ( req: Request, res: Response) => {
    // Chek if request with user(email) and book ids.
    const { user, bookID } = req.body
    if(!user || !bookID.length ) return res.status(400).json({'message': 'User and book ID are required.'})

    // Check if user exist has favorite book list.
    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id
    const favobookOwnerCheck = await FavBook.findOne({ userID: userID}).exec()

    if(favobookOwnerCheck){
        try{
            // If favorite book list exist add new books to the list.
            for(let i=0; i<bookID.length; i++){
                const favobookCheck = await favobookOwnerCheck.favobooks.find((b:any)=>b.bookID==bookID[i])
                if(!favobookCheck){
                    await favobookOwnerCheck.favobooks.push({bookID: bookID[i]})
                }
            }
            // Save new list to database and get updated list.
            await favobookOwnerCheck.save(async(err:any, books:any)=>{
                if(err) res.status(500).json({"message": err.message})

                const returnFavoBooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

                res.status(201).json({"message": "Favourite book added.", "favobooks":returnFavoBooks})
            })
            
        } catch (err: any){
            res.status(500).json({"message": err.message})
        }
    } else {
        // If favorite book list not exist, create a list and the new books.
        try{
            const result = await FavBook.create({
                "userID": userID,
                "favobooks":[]
            })

            for( let i=0; i<bookID.length; i++){
                await result.favobooks.push({bookID: bookID[i]})
            }

            await result.save()
            // Get new created favorite book list.
            const returnFavoBooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()
            
            res.status(201).json({"message": `New favourite book ${bookID} added!`, "favobooks": returnFavoBooks})
    
        } catch(err: any) {
            res.status(500).json({"message": err.message})
        }
    }

}


// Update favorite book list.
const updateFavoBooks = async (req: Request, res: Response) => {
    // Check if request with user(email).
    const { user, bookID } = req.body
    if(!user ) return res.status(400).json({'message': 'User is required.'})

    // Get user id
    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id

    try{
        // Find user favorite book list,  update it.
        const getList = await FavBook.findOne({userID: userID}).exec() 
        getList.favobooks = []

        for( let i=0; i<bookID.length; i++){
            await getList.favobooks.push({bookID: bookID[i]})
        }

        await getList.save()

        res.status(201).json({"message": `Favo book updated!`})

    }catch(err:any){
        res.status(500).json({"message": err.message})
    }

}


// Get user's favorite book list.
const getFavoBooks = async ( req: Request, res: Response) => {
    // Check if request with user(email).
    const { user } = req.body
    if(!user) return res.status(400).json({'message': 'User ID is required.'})

    // Get user id and check if this user has a favorite book list.
    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id
    const favobookOwnerCheck = await FavBook.findOne({ userID: userID}).exec()

    // If book list not exist response 404.
    if(!favobookOwnerCheck) return res.status(404).json({"message": `${userID} don't has a favourite book list.`})

    // If book list exist, get favorite book list and book information from books database.
    try {
        const favobooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

        res.status(200).json({"message": "Success", "favobooks":favobooks})

    } catch (err: any){
        res.status(500).json({"message": err.message})
    }
}


// Delete books from user's favorite book list.
const deleteFavoBook = async ( req: Request, res: Response) => {
    // Check if request with user(email) and book ids.
    const { user, bookID } = req.body
    if(!user || !bookID.length ) return res.status(400).json({'message': 'User and book ID are required.'})

    // Find user's favorite book list.
    const getUser = await User.findOne({ email: user}).exec()
    const userID = getUser.id
    const favobookOwnerCheck = await FavBook.findOne({ userID: userID}).exec()

    if(favobookOwnerCheck){
        // If user's favorite book list exist, delete books from it.
        try {
            for(let i=0; i<bookID.length; i++){
                const newFavoBooks = await favobookOwnerCheck.favobooks.find((book:any)=>book.bookID==bookID[i])
                if(newFavoBooks){
                    await favobookOwnerCheck.favobooks.id(newFavoBooks._id).remove()
                } 
            }

            await favobookOwnerCheck.save()

            const returnFavoBooks = await FavBook.findOne({ userID: userID}).populate({path:'favobooks', populate: {path: 'bookID', select:'title authors pub_year'}}).exec()

            res.status(200).json({"message": "Favourite book deleted.", "favobooks":returnFavoBooks})

        } catch (err: any) {
            res.status(500).json({"message": err.message})
        }

    } else {
        // If user's favorite book list not exist return error.
        res.status(404).json({"message": `${userID} don't have a favourite book list.`})
    }

}


module.exports = { 
    addFavobook, 
    updateFavoBooks, 
    getFavoBooks, 
    deleteFavoBook,
}