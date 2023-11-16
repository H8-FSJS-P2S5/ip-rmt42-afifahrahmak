const {Inventory} = require("../models")

async function authorization(req, res, next) {
    try {
        const inventory = await Inventory.findByPk(req.params.id)
        if(!inventory) {throw {name: "Data not found"}}
        if(req.user.id !== inventory.UserId) {throw {name: "Forbidden"}}
        next()
    } catch(err) {
        next(err)
    }
}

module.exports = authorization