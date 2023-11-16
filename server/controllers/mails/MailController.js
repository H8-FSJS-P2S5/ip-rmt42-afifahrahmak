const nodemailer = require('nodemailer');
const { Book, User, History } = require('../../models');

class MailController {
    static async sendMail(req, res, next) {
        const { historyId } = req.body;
        try {
            const {bookId} = await History.findByPk(historyId);
            const { link, title } = await Book.findByPk(bookId);
            const { email } = await User.findByPk(req.user.id);
            console.log({historyId, bookId, link, title, email});
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.APP_USER_GMAIL,
                    pass: process.env.APP_PASSWORD_GMAIL
                }
            });

            const mailOptions = {
                from: `"IPustaka-IP.RV" <${process.env.APP_USER_GMAIL}>`,
                to: email,
                subject: "IPustaka - Read Your Book",
                text: "Hello, let's start to read!",
                html: `<p>Here is your book link for title ${title}: ${link}</p>`
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Successfully send email' });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = MailController;
