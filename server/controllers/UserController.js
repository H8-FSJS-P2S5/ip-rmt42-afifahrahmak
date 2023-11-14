const { hashPassword } = require("../helpers/bcrypt");
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
}

module.exports = UserController