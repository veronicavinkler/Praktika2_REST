// book.controller.js
const Book = require("../models/book.model");

// 1 Get all books
exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

// 2 Get a book by ID
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.bookid);
        if (!book) {
            return res.status(404).json({ message: "Raamatut ei leitud" });
        }
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

// 3 Create a new book
exports.createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
};

// 4 Update a book by ID
exports.updateBook = async (req, res, next)=>{
    try {
        const [updated] = await Book.update(req.body, {
            where: { book_id: req.params.id },
        });
        if (!updated) {
            return res.status(404).json({ message: "Raamatut ei leitud" });
        }
        res.status(200).json({ message: "Raamat uuendati edukalt" });
    } catch (err) {
        next(err);
    }
};

// 5 Delete book by ID
exports.deleteBook = async (req, res, next) => {
    try {
        const deleted = await Book.destroy({
            where: { book_id: req.params.id },
        });
        if (!deleted) {
            return res.status(404).json({ message: "Raamatut ei leitud" });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

