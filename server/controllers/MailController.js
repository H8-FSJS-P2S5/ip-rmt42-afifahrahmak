const nodemailer = require('nodemailer');

module.exports = class MailController {

    static async sendMail(req, res, next) {
        try {
            const { username, email, message } = req.body;

            // console.log(username, email, message)

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.E_SENDER}`,
                    pass: `${process.env.E_PASS}`,
                },
            });

            const mailOptions = {
                from: `${email}`,
                to: `${process.env.E_RECEIVER}`,
                subject: `New Message from our dearest ${username},`,
                text: `${message}`,
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: "Your message sent successfully" });

        } catch (error) {
            next(error);
            console.log(error)
        }
    }


}