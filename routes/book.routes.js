
// book.routes.js
const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const bookController = require("../controllers/book.controller");
const { param, body } = require("express-validator");
const validateRequest = require("../middleware/validationResult");

// 1 Get all books
router.get("/books", bookController.getAllBooks)

// 2 Get a book by ID
router.get(
    "/books/:id",
    [
        param("id").isInt().withMessage("Autori ID peab olema täisarv"), // 🇪🇪 Keel ühtlustatud
        validateRequest,
    ],
    bookController.getBookById);

// 3 Create a new book
router.post(
    "/books",
     authJwt.verifyToken,
     authJwt.isAdmin,
    [
        body("title").notEmpty().withMessage("Pealkiri on kohustuslik"),
        validateRequest,
    ],
    bookController.createBook
);

// 4 Update a book by ID
router.put(
    "/books/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    [
        param("id").isInt().withMessage("Raamatu ID peab olema täisarv"),
        body("title").optional().notEmpty().withMessage("Pealkiri ei tohi olla tühi"),
        validateRequest,
    ],
    bookController.updateBook
);

// 5 Delete book by ID
router.delete(
    "/books/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    [
        param("id").isInt().withMessage("Raamatu ID peab olema täisarv"),
        validateRequest,
    ],
    bookController.deleteBook
);

module.exports = router;