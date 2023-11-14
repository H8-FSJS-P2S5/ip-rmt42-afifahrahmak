
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw ({ name: "Unauthenticated" });
        const token = req.headers.authorization.split(' ').at(-1);

        if (!token) throw ({ name: "Unauthenticated" });

        const { id } = verifyToken(token);
        const user = await User.findByPk(id);

        if (!user) throw ({ name: "Unauthenticated" });
        req.user = {
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