const { Op } = require("sequelize");
const {MusicKit} = require("../models");

class MusicKitController {
    static async getMusicKits(req, res, next) {
        try {
            const {page = 1, search} = req.query
            const limit = 8
            const offset = (page - 1) * limit

            const options = {}
            // options.limit = limit
            // options.offset = offset

            if(search) {
                options.where = {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }

            const musicKits = await MusicKit.findAll(options)
            res.status(200).json(musicKits)
        } catch(err) {
            next(err)
        }
    }

    static async getMusicKitId(req, res, next) {
        try {
            const id = req.params.id
            const musicKit = await MusicKit.findByPk(id)
            if(!musicKit) {
                throw {name: "Data not found"}
            }
            res.status(200).json(musicKit)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = MusicKitController