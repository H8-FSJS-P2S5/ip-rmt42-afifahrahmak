const { User } = require("../models")
const { Review } = require("../models")
const { signToken, verifyToken } = require("../helpers/jwt")

const authorization = async (req, res, next) => {
    console.log(req.userData, "<<<User data")
    try {
        let review = await Review.findByPk(req.params.id)

        // console.log(req)
        console.log(review)

        if (!review) {
            throw { name: 'NotFound' }

        }

        if (req.userData.role !== 'admin') {
            // Check Review API


            if (req.userData.id !== review.userId) {
                throw { name: 'Forbidden' }
            }

        }
        next()
    } catch (error) {
        next(error)
    }
}

const authorizationAdmin = async function mesinAuthentifikasi(req, res, next) {
    console.log("auth admin")
    try {
        // console.log("Authorization process")
        if (req.userData.role !== "admin") {
            throw { name: 'Forbidden' }
        }

        next();

    } catch (error) {
        console.log(">>>>>> authorization error",error)
        next(error)
    }
}


module.exports = { authorization, authorizationAdmin }
