const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();


module.exports = class UserController {

    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const user = await User.create({ username, email, password });

            res.status(201).json({
                "id": user.id,
                "username": user.username
            });

        } catch (error) {
            next(error);
        }
    }


    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                res.status(400).json({ message: "Error invalid email or Password" });
                return;
            }

            if (!password) {
                res.status(400).json({ message: "Error invalid email or Password" });
                return;
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                next({ name: 'Unauthenticated', message: "User not found or Password not matched" });
                return;
            }

            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword) {
                next({ name: 'Unauthenticated', message: "User not found or Password not matched" });
                return;
            }

            const access_token = signToken({ id: user.id });
            res.status(200).json({ access_token });

        } catch (error) {
            console.log(error)
            next(error);
        }
    }


    static async googleLogin(req, res, next) {
        console.log(req.headers.g_token)

        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.g_token,
                audience: process.env.G_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            console.log(payload)

            const [user, isNewRecord] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    password: String(Math.random())
                }
            })

            const access_token = signToken({ id: user.id });
            res.status(isNewRecord ? 201 : 200).json({ access_token });

        } catch (error) {
            next(error);
        }
    }

}