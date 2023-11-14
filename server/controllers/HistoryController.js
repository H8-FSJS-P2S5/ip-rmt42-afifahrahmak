const OpenAI = require('openai');
const { History } = require('../models');
const { generateAnsPromt, chatAI } = require('../helpers/openai');

class HistoryController {
    static async create(req, res, next) {
        const { bookId } = req.params
        try {
            const history = await History.create({ userId: req.user.id, status: 'unpaid', bookId });
            const question = `randomize saya 5 pertanyaan yang jawabannya cukup ya atau tidak mengenai topik pemrograman khususnya materi dasar javascript, reactjs, dan express js cukup pertanyaan mudah dan singkat untuk junior programmer atau bahkan orang awam. cukup jawab tanpa deskripsi apa pun cukup dengan format seperti di bawah ini di mana 5 pertanyaan tersebut dalam 1 array! perhatikan dengan benar format di bawah ini! dan jangan berikan respons dalam bentuk list di list
            format responsnya harus seperti ini, perhatikan! pertanyaan1;;pertanyaan 2;;pertanyaan3`;
            let questions = chatAI(question);
            history.update({ question: questions });
            questions = questions.split(';;');
            res.status(201).json({
                messages: `Successfully create history`, data: { questions, historyId: history.id }
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updatePoin(req, res, next) {
        const { answer } = req.body;
        const { historyId } = req.params;
        try {
            const history = History.findByPk(historyId);
            const promt = generateAnsPromt(history.question, answer);
            let point = chatAI(promt);
            history.update({ point: +point, answer: answer.join(";;") });
            res.status(200).json({ messages: `Successfully get point`, data: +point });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updateBookId(req, res, next) {
        const { historyId, bookId } = req.params;
        try {
            const history = History.findByPk(historyId);
            history.update({ bookId });
            res.status(200).json({ messages: `Successfully update book` });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = HistoryController;