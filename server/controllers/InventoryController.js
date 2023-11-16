const { Inventory, MusicKit, Order } = require("../models");
const axios = require("axios")
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
            const orderId = req.body.orderId
            const order = await Order.findOne({
                where: {
                    orderId
                }
            })
            if(!order) {
                throw {name: "Data not found"}
            }

            const base64Key = Buffer.from(process.env.MIDTRANS_SERVER_KEY).toString("base64")
            const {data} = await axios({
                method: "GET",
                url: `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
                headers: {
                    Authorization: `Basic ${base64Key}`
                }
            })
            if (Number(data.status_code) !== 200) {
                throw {name: "Transaction failed"}
            }
            if (data.transaction_status !== "capture") {
                throw {name: "Transaction failed"}
            }

            await order.update({ status: "paid", paidDate: new Date()})

            //ADD INVENTORY
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

    static async deleteInventory(req, res, next) {
        try {
            const id = req.params.id
            const inventory = await Inventory.destroy({
                where: {id}
            })
            if(!inventory) {
                throw {name: "Data not found"}
            }
            res.status(200).json(`Success deleting item from inventory`)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = InventoryController