const { Profile, Post, User, Comment } = require('../models')

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
        if (!req.user) {
            throw { name: 'Forbidden', message: 'Please Login'}
        }
        
        const { id } = req.user
        const { postId } = req.params
        const post = await Post.findByPk(postId)
        if (!post) {
            throw { name: 'NotFound', message: 'Post not found' }
        }

        const user = await User.findByPk(id)

        if (!user) {
            throw { name: 'NotFound', message: 'User not found' }
        }

        if (user.status === 'Immortal') {
            return next()
        }

        if (user.status === post.status) {
            return next()
        }

        if (user.status !== post.status) {
            throw { name: 'Forbidden', message: 'You are not authorized' }
        }

        next()
    } catch (error) {
        next(error)
    }
}

async function commentAuthorization(req, res, next) {
    try {
        const { id } = req.user
        const { commentId } = req.params

        const comment = await Comment.findByPk(commentId)
        if (!comment) {
            throw { name: 'NotFound', message: 'Comment not found' }
        }

        if (id !== comment.UserId) {
            throw { name: 'Forbidden', message: 'You are not authorized' }
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { profileAuthorization, postAuthorization, statusAuthorization, commentAuthorization }