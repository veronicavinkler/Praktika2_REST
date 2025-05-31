// comment.controller.js
const Comment = require("../models/comment.model.js");

// 1 Get all comments for a book
exports.getCommentsForBook = async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            where: { book_id: req.params.id },
        });
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
};

// 2 Get a single comment by ID
exports.createComment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        const { content } = req.body;

        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Raamatut ei leitud" });
        }
        const comment = await Comment.create({
            user_id: userId,
            book_id: bookId,
            content,
        });
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
};

