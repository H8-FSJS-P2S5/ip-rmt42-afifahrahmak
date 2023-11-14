const { User, Book } = require("../models");

const authorization = {
    AdminOnly: async (request, response, next) => {
        try {
            const user = await User.findByPk(request.user.id);
            if (!user) throw ({ name: "Unauthorized" });
            if (user.role !== 'admin') throw ({ name: "Unauthorized" });

            next();
        } catch (error) {
            next(error);
        }
    },

}

module.exports = authorization;