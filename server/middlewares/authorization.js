const { Profile, Post } = require('../models')

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

async function postAuthorization(req, res, next) {
    try {
        const { id } = req.user
        const { postId } = req.params
        const post = await Post.findByPk(postId)
        if (!post) {
            throw { name: 'NotFound', message: 'Post not found' }
        }

        if (id !== post.UserId) {
            throw { name: 'Forbidden', message: 'You are not authorized' }
        }

        next()
    } catch (error) {
        console.log(error)
    }

}

module.exports = { profileAuthorization, postAuthorization }