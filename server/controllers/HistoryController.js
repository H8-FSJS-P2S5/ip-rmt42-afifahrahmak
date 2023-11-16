const OpenAI = require('openai');
const { History } = require('../models');
const { generateAnsPromt, chatAI } = require('../helpers/openai');

class HistoryController {
    static async create(req, res, next) {
        const { bookId } = req.body;
        console.log(bookId);
        try {
            const history = await History.create({ userId: req.user.id, status: 'unpaid', bookId });
            const question = `randomize saya 5 pertanyaan yang jawabannya cukup ya atau tidak mengenai topik pemrograman khususnya materi dasar javascript, reactjs, dan express js, cukup pertanyaan mudah dan singkat untuk junior programmer atau bahkan orang awam. cukup kembalikan respons tanpa deskripsi apa pun. jangan berikan respons dalam bentuk list, jangan berikan respons satu-satu satukan semua dalam 1 string, jangan ada enter atau karakter '/n' pada respons, harus satukan semua pertanyaannya dalam 1 string dan harus dengan format responsnya harus seperti ini perhatikan : pertanyaan1;;pertanyaan 2;;pertanyaan3`;
            let questions = await chatAI(question);
            history.update({ question: questions });
            questions = questions.split(';;');
            res.status(201).json({
                messages: `Successfully create history`, data: { questions, historyId: history.id }
            });
        } catch (error) {
            next(error);
        }
    }

    static async updatePoin(req, res, next) {
        const { answer } = req.body;
        const { historyId } = req.params;
        console.log(historyId, answer);
        try {
            const history = await History.findByPk(historyId);
            const promt = generateAnsPromt(history.question, answer);
            let point = await chatAI(promt);
            if (+point === NaN) point = 0;
            console.log(point);
            await history.update({ point: +point, answer: answer.join(";;") });
            res.status(200).json({ messages: `Successfully get point`, data: +point });
        } catch (error) {
            next(error);
        }
    }

    static async updateBookId(req, res, next) {
        const { historyId, bookId } = req.params;
        try {
            const history = await History.findByPk(historyId);
            await history.update({ bookId });
            res.status(200).json({ messages: `Successfully update book` });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = HistoryController;