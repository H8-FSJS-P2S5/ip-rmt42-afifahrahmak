const { bcryptCompare } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { User, UserDetail } = require("../models");

class UserController {
    static async getAll(request, response) {
        try {
            const users = await User.findAndCountAll({
                include: {
                    model: UserDetail
                }
            });

            response.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getById(request, response, next) {
        try {
            const user = await User.findByPk(request.params.id, {
                include: {
                    model: UserDetail
                }
            });

            if (!user) throw ({ name: "NotFound" });

            response.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async create(request, response, next) {
        const { username, email, password, role = 'member', accountType = 'manual', name, address, gender } = request.body;
        try {
            const user = await User.create({ username, email, password, role, accountType });
            await UserDetail.create({ userId: user.id, name, address, gender});
           
            response.status(201).json({ id: user.id, email: user.email, role: user.role });
        } catch (error) {
            next(error);
        }
    }

    static async update(request, response, next) {
        const { username, email, password, name, address, gender } = request.body;
        try {
            let user = await User.findByPk(request.params.id, {
                include: {
                    model: UserDetail
                }
            });

            await user.update({ username, email, password });
            await user.UserDetail.update({ name, address, gender });

            response.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async delete(request, response, next) {
        try {
            let user = await User.findByPk(request.params.id);

            await user.destroy();
            response.status(200).json({ message: `User with id: ${user.id} success to delete` });
        } catch (error) {
            next(error);
        }
    }

    static async login(request, response, next) {
        const { username, email, password } = request.body;
        try {
            if (!email || email === "") throw ({ name: `EmptyEmail` });
            if (!password || password === "") throw ({ name: `EmptyPassword` });
            
            const user = await User.findOne({ where: { email } });
            if (!user || !bcryptCompare(password, user.password)) throw ({ name: "NotMatched" });

            const token = createToken({ id: user.id });
            response.status(200).json({ access_token: token, email: user.email, role: user.role });
        } catch (error) {
            next(error);
        }
    }


}

module.exports = UserController;