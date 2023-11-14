const OpenAI = require('openai');
const { History } = require('../models');
const { generateAnsPromt } = require('../helpers/openai');

class HistoryController {
    static async create(req, res, next) {
        try {
            const history = await History.create({ userId: req.user.id, status: 'unpaid' });
            const openai = new OpenAI({
                apiKey: process.env.OpenAI_KEY
            });

            const question = `randomize saya 5 pertanyaan yang jawabannya cukup ya atau tidak mengenai topik pemrograman khususnya materi dasar javascript, reactjs, dan express js cukup pertanyaan mudah dan singkat untuk junior programmer atau bahkan orang awam. cukup jawab tanpa deskripsi apa pun cukup dengan format seperti di bawah ini di mana 5 pertanyaan tersebut dalam 1 array! perhatikan dengan benar format di bawah ini! dan jangan berikan respons dalam bentuk list di list
            format responsnya harus seperti ini, perhatikan! pertanyaan1;;pertanyaan 2;;pertanyaan3`;

            const { choices } = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ "role": "user", "content": question }],
                max_tokens: 210
            });

            let questions = choices[0].message.content;
            history.update({ question: questions });
            questions = questions.split(';;');
            res.status(201).json({ messages: `Successfully create history`, data: questions });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async update(req, res, next) {
        const { answer, historyId } = req.body
        try {
            const history = History.findByPk(historyId);
            const promt = generateAnsPromt(history.question, answer);

            const openai = new OpenAI({
                apiKey: process.env.OpenAI_KEY
            });

            const { choices } = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ "role": "user", "content": promt }],
                max_tokens: 210
            });

            let questions = choices[0].message.content;
            history.update({ point: +questions });

            res.status(200).json({ messages: `Successfully get point`, data: questions });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    
}

module.exports = HistoryController;