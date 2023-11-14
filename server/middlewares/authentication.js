
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (request, response, next) => {
    try {
        if (!request.headers.authorization) throw ({ name: "Unauthenticated" });
        const token = request.headers.authorization.split(' ').at(-1);

        if (!token) throw ({ name: "Unauthenticated" });

        const { id } = verifyToken(token);
        const user = await User.findByPk(id);

        if (!user) throw ({ name: "Unauthenticated" });
        request.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authentication;