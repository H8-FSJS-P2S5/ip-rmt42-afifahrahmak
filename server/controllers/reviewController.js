const { Review, User, Gadget } = require("../models")

class ReviewController {
    static async createReview(req, res, next) {
        try {
            const {gadgetId} = req.params.id
            const {content} = req.body
            const review = await Review.create({content, gadgetId})
            res.status(201).json(review)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getAllReview(req, res, next) {
        try {
            const review = await Review.findAll()
            res.status(200).json(review)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }



}

module.exports = ReviewController