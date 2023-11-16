const { Comment } = require("../models");

module.exports = class MailController {

    static async addComment(req, res, next) {
        try {
            const comment = await Comment.create({ ...req.body, userId: req.user.id })
            res.status(201).json(comment);
        } catch (error) {
            next(error); 
        }
    }

    static async editComment(req, res, next) {
        try {
            let comment = await Comment.findByPk(req.params.id);
            let update = await comment.update(req.body, { returning: true });
            res.status(200).json(update);
        } catch (error) {
            next(error);
        }
    }

    static async deleteComment(req, res, next) { 
        try {
            let comment = await Comment.findByPk(req.params.id);
            await comment.destroy();
            res.status(200).json({ message: `Comment success to delete` });
        } catch (error) {
            next(error);
        }
    }

}