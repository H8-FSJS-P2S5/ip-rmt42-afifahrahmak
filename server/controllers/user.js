const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { User, Profile } = require('../models')

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

    static async register(req, res, next) {
        try {
            const user = await User.create({ ...req.body, status: 'Free' })
            await Profile.create({displayName: user.username, firstName: user.username, status: user.status, UserId: user.id})
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