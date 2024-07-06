const { User } = require("../models")
const { comparePassword} = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
require("dotenv").config();


class Controller {

    static async addUser(req, res, next) {
        try {
         const {email, password, phoneNumber, username} = req.body
        console.log(req.body)

         
            // const hashesPassword = hashPassword(password)

            const user = await User.create({email, password , phoneNumber, username})
            res.status(201).json({
                username : user.username,
                phoneNumber : user.phoneNumber,
            })
      
        } catch (error) {
            console.log("error register >>>>>>",error.name)
            next(error)
            
            // if(error.name === 'SequelizeValidationError') {
            //     return res.status(400).json({message: error.errors[0].message})
            // }
            
            // console.log(error.name)
            // res.status(500).json({message: "Internal server error"})
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } =req.body
            console.log( email, password)
            if(!email || !password) {
                throw { name : 'EmailPasswordNull'}
            }
            const user = await User.findOne({where: {email} })
            if(!user) {
                throw { name : 'EmailInvalid'}
            }
            // console.log(user.id)

            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword) {
                throw { name: 'PasswordInvalid'}
            }

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
            console.log(error)
            // console.log(error.name)
            // res.status(500).json({message: "Internal server error"})

        }
    }

    static async loginGoogle(req, res, next) {
        try {
            console.log(req.headers)
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.G_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            console.log(payload);
            let user = await User.findOne({
                where: { email: payload.email }
            })

            if (!user) {
                user = await User.create({
                    username: payload.name,
                    email: payload.email,
                    password: 'ThisUserUsingGSI',
                    role: 'user'
                }, {
                    hooks: false
                })
            }
            const token = signToken({ id: user.id, email: user.email})

            res.status(200).json({access_token: token, username: user.username, role: user.role})
        } catch (error) {
            next(error)
        }
    }

    static async pubLoginGoogle(req, res, next) {
        try {
            console.log(req.headers)
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.G_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            console.log(payload);
            let user = await User.findOne({
                where: { email: payload.email }
            })

            if (!user) {
                user = await User.create({
                    username: payload.name,
                    email: payload.email,
                    password: 'ThisUserUsingGSI',
                    role: 'user'
                }, {
                    hooks: false
                })
            }
            const token = signToken({ id: user.id, email: user.email})

            res.status(200).json({access_token: token, username: user.username, role: user.role})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller