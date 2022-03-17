import { Request, Response } from "express"
const Review = require('../models/Review')
const Book = require('../models/Book')
const User = require('../models/User')

const getReviews = async ( req: Request, res: Response) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Book ID is required"})
    const bookID = req.params.id

    try {
        const reviews = await Review.findOne({book: bookID}).exec()
        if(!reviews) return res.status(204).json({"message": "Book reviews not exist"})
        res.json({"reviews": reviews})

    } catch (err: any) {
        res.status(500).json({"message": err.message})
    }
}

const addReview = async ( req: Request, res: Response) => {
    const { bookID, user, review, rating } = req.body

    if(!bookID || !user || !review ) return res.status(400).json({"message": "Book ID, user, and review are required"})

    try {
        const getUser = await User.findOne({ email: user}).exec()
        const userID = getUser.id
        const checkReviews = await Review.findOne({ book: bookID}).exec()

        if(checkReviews) {
            checkReviews.reviews.push({
               review: review,
               rating: rating,
               date: Date.now(),
               user: userID
            })
    
            const calResult = await getReviewsCountAndAverage(checkReviews)
    
            checkReviews.rv_count = calResult.rvCount
            checkReviews.rt_count = calResult.rtCount
            checkReviews.av_rating = calResult.rtAverage
    
            await checkReviews.save()
        } else {
            const result = await Review.create({
                "book": bookID,
                "reviews": [],
                "rv_count": 0,
                "av_rating": 0,
                "rt_count": 0
            })
    
            result.reviews.push({
                review: review,
                rating: rating,
                date: Date.now(),
                user: userID,
            })
    
            const calResult = await getReviewsCountAndAverage(result)
    
            result.rv_count = calResult.rvCount
            result.rt_count = calResult.rtCount
            result.av_rating = calResult.rtAverage
    
            await result.save()
        }

        const data = await Review.findOne({ book: bookID}).exec()
        res.status(201).json({"message":"Review added", "result": data})

    } catch (err: any){
        res.status(500).json({"message": err.message})
    }
}

const getReviewsCountAndAverage = async (obj: any) => {
    const reviewCount = obj.reviews.filter((rv: any)=>(rv.review!=null && rv.review!=undefined && rv.review!=''))
    const ratingArray = obj.reviews.map((rt: any)=>(rt.rating))
    const ratingArrayClean = ratingArray.filter((rt:any)=> (rt!=null && rt!=undefined))
    const ratingAverage = ratingArrayClean.reduce((a: number, b: never)=>a+b,0)/ratingArrayClean.length

    const rvCount = reviewCount.length
    const rtCount = ratingArrayClean.length
    const rtAverage = ratingAverage

    return {rvCount,rtCount,rtAverage}
}

module.exports = { getReviews, addReview }