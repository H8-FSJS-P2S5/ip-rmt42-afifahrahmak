const { Category } = require("../models")

class CategoryController {
    static async createCategory(req, res) {
        try {
            console.log(req.body)
            const category = await Category.create(req.body)
            res.status(201).json(category)
        } catch (error) {
            
            if(error.name === 'SequelizeValidationError') {
                return res.status(400).json({message: error.errors[0].message})
            }
            console.log(error.name)
            res.status(500).json({message: "Internal server error"})
        }
    }

    static async getAllCategory(req, res) {
        try {
            const category = await Category.findAll()
            res.status(200).json(category)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    }

}

module.exports = CategoryController