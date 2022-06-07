const { v4: uuidv4 } = require('uuid');
const path = require('path');
const {Book, BookInfo} = require('../models/models');
const ApiError = require('../error/ApiError');

class BookController {
    async create(req, res, next) {
        try {
            const {name, price, authorId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuidv4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const book = await Book.create({name, price, authorId, typeId, img: fileName});

            if (info) {
                let info = JSON.parse(info);
                info.forEach(i => BookInfo.create({
                    title: i.title,
                    description: i.description,
                    bookId: book.id
                }))
            }

            return res.json(book);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res) {
        let {authorId, typeId, limit, page} = req.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        let books;
        if (!authorId && !typeId) {
            books = await Book.findAndCountAll({limit, offset});
        }

        if (authorId && !typeId) {
            books = await Book.findAndCountAll({where: {authorId}, limit, offset});
        }

        if (!authorId && typeId) {
            books = await Book.findAndCountAll({where: {typeId}, limit, offset});
        }

        if (authorId && typeId) {
            books = await Book.findAndCountAll({where: {authorId, typeId}, limit, offset});
        }

        return res.json(books);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const book = await Book.findOne(
            {
                where: {id},
                include: [{model: BookInfo, as: 'info'}]
            }
        )
        return res.json(book);
    }
}

module.exports = new BookController();