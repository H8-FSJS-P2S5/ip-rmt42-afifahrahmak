const {Post, User, Category, Profile} = require('../models')
const { Op } = require("sequelize")

class PostController {
    static async addPost(req, res, next) {
        try {
            const {id} = req.user

            const data = await Post.create({...req.body, UserId: id, status: 'Free'})
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async posts(req, res, next) {
        try {
            let {category, search, sortBy, page} = req.query

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

            console.log(count)

            const data = await Post.findAll({
                where: cek,
                include: [{
                    model: User,
                    include: {model: Profile}
                }, {
                    model: Category
                }],
                order: [[`${sortBy}`, `ASC`]],
                limit: 10,
                offset: page * 10 - 10
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    static async editPost(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = PostController