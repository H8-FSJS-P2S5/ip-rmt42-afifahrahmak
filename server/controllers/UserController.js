const { bcryptCompare } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { User, UserDetail, History } = require("../models");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class UserController {
    static async create(request, response, next) {
        const { username, email, password, role = 'member', accountType = 'manual', name, address, gender } = request.body;
        try {
            const user = await User.create({ username, email, password, role, accountType });
            await UserDetail.create({ userId: user.id, name, address, gender });

            response.status(201).json({ id: user.id, email: user.email, role: user.role });
        } catch (error) {
            next(error);
        }
    }

    static async login(request, response, next) {
        const { email, password } = request.body;
        try {
            if (!email || email === "") throw ({ name: `EmptyEmail` });
            if (!password || password === "") throw ({ name: `EmptyPassword` });

            const user = await User.findOne({ where: { email } });
            if (!user) throw ({ name: "NotMatched" });
            if (user.accountType === 'google') throw ({ name: 'googleAcc' });
            if (!bcryptCompare(password, user.password)) throw ({ name: "NotMatched" });
            response.status(200).json({ access_token: createToken({ id: user.id }), email: user.email, role: user.role });
        } catch (error) {
            next(error);
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.g_token,
                audience: process.env.G_CLIENT,
            });
            const payload = ticket.getPayload();
            const [user, newUser] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    password: String(Math.random()),
                    accountType: 'google'
                }
            });
            if (newUser) await UserDetail.create({ userId: user.id, name: user.username });
            res.status(newUser ? 201 : 200).json({ access_token: createToken({ id: user.id }) });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = UserController;


// static async update(request, response, next) {
//     const { username, email, password, name, address, gender } = request.body;
//     try {
//         let user = await User.findByPk(request.params.id, {
//             include: {
//                 model: UserDetail
//             }
//         });

//         await user.update({ username, email, password });
//         await user.UserDetail.update({ name, address, gender });

//         response.status(200).json(user);
//     } catch (error) {
//         next(error);
//     }
// }

// static async delete(request, response, next) {
//     try {
//         let user = await User.findByPk(request.params.id);

//         await user.destroy();
//         response.status(200).json({ message: `User with id: ${user.id} success to delete` });
//     } catch (error) {
//         next(error);
//     }
// }


// static async getTopThree(request, response) {
//     try {
//         const users = await User.findAndCountAll({
//             include: [
//                 { model: UserDetail },
//                 {
//                     model: History,
//                     attributes: [
//                         [sequelize.fn('SUM', sequelize.col('point')), 'totalPoints']
//                     ],
//                     group: ['userId'],
//                 },
//             ],
//             order: [
//                 [sequelize.literal('totalPoints DESC')],
//             ],
//             limit: 3,
//         });

//         response.status(200).json(users);
//     } catch (error) {
//         next(error);
//     }
// }

// static async getById(request, response, next) {
//     try {
//         const user = await User.findByPk(request.params.id, {
//             include: [
//                 { model: UserDetail },
//                 { model: History },
//             ]

//         });

//         if (!user) throw ({ name: "NotFound" });

//         response.status(200).json(user);
//     } catch (error) {
//         next(error);
//     }
// }