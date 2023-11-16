const {Profile, User, Post} = require('../models')

class ProfileController {

    static async editProfile(req, res, next) {
        try {
            const {username} = req.params
            const profile = req.body

            const {id} = await User.findOne({where: {username}})
            if (!id) {
                throw {name: 'NotFound', message: 'User not found'}
            }

            const data = await Profile.findOne({where: {UserId: id}})

            const updated = await data.update(profile)
            res.status(201).json(updated)
        } catch (error) {
            next(error)
        }
    }

    static async getProfile(req, res, next) {
        try {
            const {username} = req.params
            const user = await User.findOne({where: {username: username}})
            if (!user.id) {
                throw {name: 'NotFound', message: 'User not found'}
            }

            const profile = await Profile.findOne({
                where: {UserId: user.id},
                include: {
                    model: User,
                    include: {
                        model: Post
                    }
                } 
            })
            res.status(200).json(profile)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProfileController