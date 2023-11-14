const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const {User} = require("../models");


class UserController {
    static async register(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email) {throw {name: "Email is required"}}
            if(!password) {throw {name: "Password is required"}}
            const hashedPassword = hashPassword(password)
            const user = await User.create({email: email, password: hashedPassword})
            res.status(201).json(`New user with id: ${user.id} and email: ${user.email} created`)
        } catch(err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email) {throw {name: "Email is required"}}
            if(!password) {throw {name: "Password is required"}}

            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user) {
                throw {name: "Invalid email or password"}
            }

            const validated = comparePassword(password, user.password)
            if(!validated) {
                throw {name: "Invalid email or password"}
            }
            const token = signToken({id: user.id, email: user.email})
            res.status(200).json({access_token: token, id: user.id, email: user.email})
        } catch(err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.G_CLIENT
            })
            const payload = ticket.getPayload()

            let user = await User.findOne({
                where: {email: payload.email}
            })

            if(!user) {
                user = await User.create({
                    email: payload.email,
                    password: String(Math.random() * 100)
                })
            }

            let token = signToken({id: user.id, email: user.email})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController