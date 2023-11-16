const { Profile, Post, User } = require('../models')

async function profileAuthorization(req, res, next) {
    try {
        const { id } = req.user
        const profile = await Profile.findOne({ where: { UserId: id } })
        if (!profile) {
            throw { name: 'Forbidden', message: 'You are not authorized' }
        }

        next()
    } catch (error) {
        next(error)
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
        next(error)
    }

}

async function statusAuthorization(req, res, next) {
    try {
        try {
            const { id } = req.user
            const { postId } = req.params
            const post = await Post.findByPk(postId)
            if (!post) {
                throw { name: 'NotFound', message: 'Post not found' }
            }
                
            const user = await User.findByPk(id)

            if (!user) {
                throw { name: 'NotFound', message: 'Post not found' }
            }

            if (user.status === 'Immortal') {
                return next()
            }

            if (user.status !== post.status) {
                throw { name: 'Forbidden', message: 'You are not authorized' }
            }
    
            next()
        } catch (error) {
            next(error)
        }
    } catch (error) {
        
    }
}

module.exports = { profileAuthorization, postAuthorization, statusAuthorization}