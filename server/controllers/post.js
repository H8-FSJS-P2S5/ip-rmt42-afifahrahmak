const {Post, User, Category, Profile, Comment} = require('../models')
const { Op } = require("sequelize")

class PostController {
    static async addPost(req, res, next) {
        try {
            const {id} = req.user

            const data = await Post.create({...req.body, UserId: id})
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async posts(req, res, next) {
        try {
            let {category, search, sortBy, page} = req.query
            const user = req.user
            let cek 
            if (category && search) {
                cek = {
                    CategoryId: category,
                    title : {
                        [Op.iLike]: `%${search}%`
                    }
                }
            } else if (category) {
                cek = {CategoryId: category}
            } else if (search) {
                cek = {
                    name : {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }

            if (!page) {
                page = 1
            }

            if (!sortBy) {
                sortBy = 'createdAt'
            }

            const {count} = await Post.findAndCountAll()

            const totalPage = Math.ceil(count/10)
            const totalData = count

            const data = await Post.findAll({
                where: cek,
                include: [{
                    model: User,
                    include: {model: Profile}
                }, {
                    model: Category
                }, {
                    model: Comment,
                    include: {
                        model: User,
                        include: {model: Profile}
                    }
                }],
                order: [[`${sortBy}`, `ASC`]],
                limit: 10,
                offset: page * 10 - 10
            })
            res.status(200).json({totalPage, totalData ,data, user})
        } catch (error) {
            next(error)
        }
    }

    static async detailPost(req, res, next) {
        try {
            const {postId} = req.params
            const post = await Post.findByPk(postId, {
                include: [{
                    model: User,
                    include: {model: Profile}
                }, {
                    model: Category
                }, {
                    model: Comment,
                    include: {
                        model: User,
                        include: {model: Profile}
                    }
                }],
            })
            if (!post) {
                throw { name: 'NotFound', message: 'Cuisine not Found' }
            }

            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async editPost(req, res, next) {
        try {
            const {postId} = req.params
            const post = await Post.findByPk(postId) 
            if (!post) {
                throw { name: 'NotFound', message: 'Cuisine not Found' }
            }

            const newPost = req.body
            const updated = await post.update(newPost)
            res.status(201).json(updated)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PostController