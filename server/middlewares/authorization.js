const { Profile } = require('../models')

async function profileAuthorization(req, res, next) {
    try {
        const { id } = req.user
        const profile = await Profile.findOne({ where: { UserId: id } })
        if (!profile) {
            throw { name: 'Forbidden', message: 'You are not authorized' }
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { profileAuthorization }