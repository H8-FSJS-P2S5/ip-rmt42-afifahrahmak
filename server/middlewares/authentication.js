const { verifyToken } = require("../helper/jwt");
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw { name: 'Unauthenticated' }
        }

        const access_token = req.headers.authorization.split(' ')[1]
        const { id } = verifyToken(access_token)
        const user = await User.findByPk(id)
        if (!user) {
            throw { name: 'Unauthenticated' }
        }

        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            status: user.status,
            role: user.role
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication