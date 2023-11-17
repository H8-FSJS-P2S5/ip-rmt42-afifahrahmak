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

    static async destroyComment(req, res, next) {
        try {
            const {commentId} = req.params
            const comment = await Comment.findByPk(commentId)
            if (!comment) {
                throw {name: 'NotFound', message: 'Post not found'}
            }

            await Comment.destroy({where: {id: commentId}})
            res.status(200).json({message: 'Delete success'})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }   
}

module.exports = CommentController