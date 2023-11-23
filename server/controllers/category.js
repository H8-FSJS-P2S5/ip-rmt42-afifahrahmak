const { Category } = require('../models')
const axios = require('axios')

class CategoryController {
    static async addCategory(req, res, next) {
        try {
            const data = await Category.create(req.body)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async categories(req, res, next) {
        try {
            const data = await Category.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CategoryController