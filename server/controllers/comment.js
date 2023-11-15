const {Comment, Post} = require('../models')

class CommentController {
    static async addComment(req, res, next) {
        try {
            const {id} = req.user
            const {postId} = req.params
            const post = await Post.findByPk(postId)
            if (!post) {
                throw {name: 'NotFound', message: 'Post not found'}
            }
            const comment = await Comment.create({...req.body, UserId: id, PostId: postId})
            res.status(201).json(comment)
        } catch (error) {
            next(error)
        }
    }

    static async destroy(req, res, next) {
        try {
            const {postId} = req.params
            const post = await Post.findByPk(postId)
            if (!post) {
                throw {name: 'NotFound', message: 'Post not found'}
            }

            await Post.destroy(postId)
        } catch (error) {
            next(error)
        }
    }   
}

module.exports = CommentController