const { comparePassword } = require('../helper/bcrypt');
const getProfileImg = require('../helper/dicebear');
const { signToken } = require('../helper/jwt')
const { User, Profile } = require('../models')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const midtransClient = require('midtrans-client');
const nodemailer = require('nodemailer')

class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: 'BadRequest', message: 'Email is required' }
            }
            if (!password) {
                throw { name: 'BadRequest', message: 'Password is required' }
            }

            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: 'Unauthorized', message: 'Invalid username/password' }
            }

            if (user.role !== 'GM') {
                const isValid = comparePassword(password, user.password)
                if (!isValid) {
                    throw { name: 'Unauthorized', message: 'Invalid username/password' }
                }
            } else {
                if (user.password !== password) {
                    throw { name: 'Unauthorized', message: 'Invalid username/password' }
                }
            }

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async loginOAuth(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.g_token,
                audience: process.env.G_CLIENT,
            });
            console.log(req.body, '<<< user')
            const payload = ticket.getPayload();

            let user = await User.findOne({ where: { email: payload.email } })
            if (!user) {
                user = await User.create({
                    username: payload.email,
                    email: payload.email,
                    password: String(Math.random)
                })

                if(user) {
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: "luluswahyu99.lw@gmail.com",
                            pass: "rilb xeqp jwat cyll"
                        }
                    })
    
                    const mailOptions = {
                        from: "rahasiailahi1998@mail.com",
                        to: user.email,
                        subject: 'confirmation',
                        text: "Your register is success"
                    }
    
                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error) {
                            console.log(error)
                            res.status(400).json({message: 'wrong email'})
                        } else {
                            console.log("email sent")
                            res.status(200).json({message: 'Email success to send'})
                        }
                    })
                }
                const style = 'adventurer'
                const seed = Date.now().toString()

                const img = await getProfileImg(style, seed)
                await Profile.create({ imgUrl: img, displayName: user.username, firstName: user.username, status: user.status, UserId: user.id })
            }

            // console.log(user, '<<< user')
            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const style = 'adventurer'
            const seed = Date.now().toString()

            const img = await getProfileImg(style, seed)
            const user = await User.create({ ...req.body, status: 'Free' })
            if(user) {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "luluswahyu99.lw@gmail.com",
                        pass: "rilb xeqp jwat cyll"
                    }
                })

                const mailOptions = {
                    from: "rahasiailahi1998@mail.com",
                    to: user.email,
                    Text: "Your account is acctive"
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if(error) {
                        console.log(error)
                        res.status(400).json({message: 'wrong email'})
                    } else {
                        console.log("email sent")
                        res.status(200).json({message: 'Email success to send'})
                    }
                })
            }

            await Profile.create({ imgUrl: img, displayName: user.username, firstName: user.username, status: user.status, UserId: user.id })
            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async upgradeUser(req, res, next) {
        try {
            const { userId } = req.params
            const { orderId } = req.body
            const user = await User.findByPk(userId)
            const profile = await Profile.findOne({ where: { UserId: user.id } })

            if (!user) {
                throw { name: 'NotFound', message: 'User not found' }
            }

            if (!orderId) {
                throw { name: 'Forbidden', message: 'Order not complete' }
            }

            await profile.update({ status: 'Immortal' })
            const updateUser = await user.update({ status: 'Immortal' })

            res.status(201).json({ updateUser })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async payment(req, res, next) {
        try {
            const { userId } = req.params
            const user = await User.findByPk(userId)
            const profile = await Profile.findOne({ where: { UserId: user.id } })

            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.SERVER_KEY
            });

            const orderId = `trx-ua-${new Date().getTime()}`

            const parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": 10000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": profile.firstName,
                    "last_name": profile.lastName,
                    "email": user.email
                }
            }

            const { token } = await snap.createTransaction(parameter)

            if (!user) {
                throw { name: 'NotFound', message: 'User not found' }
            }

            res.status(201).json({ transaction_token: token, orderId })
        } catch (error) {

        }
    }
}

module.exports = UserController