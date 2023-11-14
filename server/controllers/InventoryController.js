const { Inventory, MusicKit } = require("../models");

class InventoryController {
    static async getInventories(req, res, next) {
        try {
            const inventories = await Inventory.findAll({
                where: {
                    UserId: req.user.id
                },
                include: {
                    model: MusicKit
                }
            })
            res.status(200).json(inventories)
        } catch(err) {
            next(err)
        }
    }

    static async postInventory(req, res, next) {
        try {
            const id = req.params.id
            const music = await MusicKit.findByPk(id)
            if(!music) {
                throw {name: "Data not found"}
            }
            const inventory = await Inventory.create({UserId: req.user.id, MusicId: id})
            res.status(200).json(`Added ${music.name} to your inventory`)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = InventoryController