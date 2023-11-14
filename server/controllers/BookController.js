const { Op } = require('sequelize');
const { Book, User, sequelize } = require('../models');
const { generateBookPromt, chatAI } = require('../helpers/openai');
const { fetchGBooks } = require('../helpers/googlebooks');

class BookController {
    static async getAll(req, res, next) {
        let { filter, page = 1, q, sortBy, limit } = req.query;

        let queryOptions = {
            attributes: ['id', 'name', 'description', 'price', 'imageUrl', 'categoryId', 'authorId'],
            limit: 12,
            offset: 0,
            where: {}
        };

        if (filter && filter !== '') {
            if (filter.category !== '' && typeof filter.category !== 'undefined') {
                const categoriesId = filter.category
                    .split(',')
                    .map((i) => ({
                        [Op.eq]: i
                    }));

                if (queryOptions.where) queryOptions.where.categoryId = { [Op.or]: categoriesId };
            }
        }

        page = +page ?? 1;
        if (q !== '' && typeof q !== 'undefined') queryOptions.where.name = { [Op.iLike]: `%${q}%` };
        if (limit !== '' && typeof limit !== 'undefined') queryOptions.limit = limit;
        if (sortBy !== '' && typeof sortBy !== 'undefined') queryOptions.order = [['createdAt', sortBy]];

        queryOptions.offset = (page - 1) * queryOptions.limit;

        try {
            const books = await Book.findAndCountAll(queryOptions);
            const datas = {
                books: books.rows,
                totalPages: Math.ceil(books.count / queryOptions.limit),
                totalDatas: books.count,
                totalDataThisPage: books.rows.length,
                currentPage: page
            }
            res.status(200).json(datas);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) throw ({ name: "NotFound" });
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        const { title, isbn, author, synopsis, pageCount, stock, publisher, publishedDate, lang, imgUrl, status, category, pricePerWeek } = req.body;
        try {
            const book = await Book.create({ title, isbn, author, synopsis, pageCount, stock, publisher, publishedDate, lang, imgUrl, status, category, pricePerWeek });
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const { title, isbn, author, synopsis, pageCount, stock, publisher, publishedDate, lang, imgUrl, status, category, pricePerWeek } = req.body;
        try {
            let book = await Book.findByPk(req.params.id);
            if (!book) throw ({ name: "NotFound" });

            await book.update({ title, isbn, author, synopsis, pageCount, stock, publisher, publishedDate, lang, imgUrl, status, category, pricePerWeek });
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            let book = await Book.findByPk(req.params.id);

            if (!book) throw ({ name: "NotFound" });

            await book.destroy();
            res.status(200).json({ message: `Book with id: ${book.id} success to delete` });
        } catch (error) {
            next(error);
        }
    }

    static async findBook(req, res, next) {
        const { desc } = req.body;
        try {
            const promt = generateBookPromt(desc);
            const bookTitle = chatAI(promt);
            const books = await fetchGBooks(bookTitle, 1);
            let book = books[0];

            const existingBook = await Book.findOne({
                where: {
                    [Op.and]: [
                        { title: book.title },
                        { isbn: book.isbn }
                    ]
                }
            });

            !existingBook ? await Book.create(book) : book = existingBook;
            let code = existingBook ? 200 : 201;

            res.status(code).json({ message: 'Successfully find book', data: book });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = BookController;