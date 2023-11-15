const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { User, Profile } = require('../models')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: 'BadRequest', message: 'Email is required' }
            }
            if (!password) {
                throw { name: 'BadRequest', message: 'Password is required' }
            }

            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: 'Unauthorized', message: 'Invalid username/password' }
            }

            if (user.role !== 'GM') {
                const isValid = comparePassword(password, user.password)
                if (!isValid) {
                    throw { name: 'Unauthorized', message: 'Invalid username/password' }
                }
            } else {
                if (user.password !== password) {
                    throw { name: 'Unauthorized', message: 'Invalid username/password' }
                }
            }

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async loginOAuth(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.g_token,
                audience: process.env.G_CLIENT,
            });
            const payload = ticket.getPayload();

            let user = await User.findOne({ where: { email: payload.email } })
            if (!user) {
                user = await User.create({
                    username: payload.email,
                    email: payload.email,
                    password: String(Math.random)
                })
            }

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const user = await User.create({ ...req.body, status: 'Free' })
            await Profile.create({ displayName: user.username, firstName: user.username, status: user.status, UserId: user.id })
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async upgradeUser(req, res, next) {
        try {
            const { userId } = req.params
            const user = await User.findByPk(userId)

            if (!user) {
                throw { name: 'NotFound', message: 'User not found' }
            }

            const updateUser = await user.update({ status: 'Immortal' })
            res.status(201).json(updateUser)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController