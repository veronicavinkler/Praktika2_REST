// comment.routes.js
const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt.js");
const commentController = require("..controllers/comment.controller.js");
const { body, param } = require("express-validator");
const validateRequest = require("../middleware/validationResult");

// 1 Get all comments for a book
router.get(
    "/books/:bookid/comments",
    [
        param("id").isInt().withMessage("Raamatu ID peab olema täisarv"),
        validateRequest,
    ],
    commentController.getCommentsForBook
);

// 2 Get a single comment by ID
router.post(
    "/comments/:id",
    authJwt.verifyToken,
    [
        param("bookid").isInt().withMessage("Raamatu ID peab olema täisarv"),
        body("content").notEmpty().withMessage("Sisu on kohustuslik"),
        validateRequest,
    ],
    commentController.createComment
);

module.exports = router;
