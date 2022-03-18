"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Review = require('../models/Review');
const Book = require('../models/Book');
const User = require('../models/User');
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id))
        return res.status(400).json({ "message": "Book ID is required" });
    const bookID = req.params.id;
    try {
        const reviews = yield Review.findOne({ book: bookID }).exec();
        if (!reviews)
            return res.status(204).json({ "message": "Book reviews not exist" });
        res.json({ "reviews": reviews });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookID, user, review, rating } = req.body;
    if (!bookID || !user || !review)
        return res.status(400).json({ "message": "Book ID, user, and review are required" });
    const getUser = yield User.findOne({ email: user }).exec();
    if (!getUser)
        return res.status(400).json({ "message": "User not exist" });
    try {
        const userID = getUser.id;
        const checkReviews = yield Review.findOne({ book: bookID }).exec();
        if (checkReviews) {
            checkReviews.reviews.push({
                review: review,
                rating: rating,
                date: Date.now(),
                user: userID
            });
            const calResult = yield getReviewsCountAndAverage(checkReviews);
            checkReviews.rv_count = calResult.rvCount;
            checkReviews.rt_count = calResult.rtCount;
            checkReviews.av_rating = calResult.rtAverage;
            yield checkReviews.save();
        }
        else {
            const result = yield Review.create({
                "book": bookID,
                "reviews": [],
                "rv_count": 0,
                "av_rating": 0,
                "rt_count": 0
            });
            result.reviews.push({
                review: review,
                rating: rating,
                date: Date.now(),
                user: userID,
            });
            const calResult = yield getReviewsCountAndAverage(result);
            result.rv_count = calResult.rvCount;
            result.rt_count = calResult.rtCount;
            result.av_rating = calResult.rtAverage;
            yield result.save();
        }
        const data = yield Review.findOne({ book: bookID }).exec();
        res.status(201).json({ "message": "Review added", "result": data });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookID, user, reviewID, review, rating } = req.body;
    if (!bookID || !user || !reviewID)
        return res.status(400).json({ "message": "Book ID, user, and review ID are required" });
    try {
        const getUser = yield User.findOne({ email: user }).exec();
        const userID = getUser.id;
        const bookReviews = yield Review.findOne({ book: bookID }).exec();
        const result = yield bookReviews.reviews.id(reviewID);
        if (!result)
            return res.status(404).json({ "message": "Review not exist" });
        if (result.user != userID)
            return res.status(401).json({ "message": "Unauthorized" });
        result.review = review;
        result.rating = rating;
        result.date = Date.now();
        const calResult = yield getReviewsCountAndAverage(bookReviews);
        bookReviews.rv_count = calResult.rvCount;
        bookReviews.rt_count = calResult.rtCount;
        bookReviews.av_rating = calResult.rtAverage;
        yield bookReviews.save();
        const data = yield Review.findOne({ book: bookID }).exec();
        res.status(201).json({ "message": "Review updated", "result": data });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const delReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookID, user, reviewID } = req.body;
    if (!bookID || !user || !reviewID)
        return res.status(400).json({ "message": "Book ID, user are required" });
    try {
        const getUser = yield User.findOne({ email: user }).exec();
        const userID = getUser.id;
        const bookReviews = yield Review.findOne({ book: bookID }).exec();
        const result = yield bookReviews.reviews.id(reviewID);
        if (!result)
            return res.status(404).json({ "message": "Review not exist" });
        if (result.user != userID)
            return res.status(401).json({ "message": "Unauthorized" });
        result.remove();
        const calResult = yield getReviewsCountAndAverage(bookReviews);
        bookReviews.rv_count = calResult.rvCount;
        bookReviews.rt_count = calResult.rtCount;
        bookReviews.av_rating = calResult.rtAverage;
        yield bookReviews.save();
        const data = yield Review.findOne({ book: bookID }).exec();
        res.status(201).json({ "message": "Review deleted", "result": data });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const getReviewsCountAndAverage = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewCount = obj.reviews.filter((rv) => (rv.review != null && rv.review != undefined && rv.review != ''));
    const ratingArray = obj.reviews.map((rt) => (rt.rating));
    const ratingArrayClean = ratingArray.filter((rt) => (rt != null && rt != undefined));
    const ratingAverage = ratingArrayClean.reduce((a, b) => a + b, 0) / ratingArrayClean.length;
    const rvCount = reviewCount.length;
    const rtCount = ratingArrayClean.length;
    const rtAverage = ratingAverage;
    return { rvCount, rtCount, rtAverage };
});
module.exports = { getReviews, addReview, updateReview, delReview };
