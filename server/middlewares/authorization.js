const {Comment} = require("../models");

async function authorization(req, res, next) {
    try {
        let comment = await Comment.findByPk(req.params.id);

        if(!comment) throw ({name: "NotFound"})

        if(comment.userId !== req.user.id){
            throw {name: "Forbidden"}
        }

        next();

    } catch (error) {
        next(error);
    }
}


module.exports = authorization;