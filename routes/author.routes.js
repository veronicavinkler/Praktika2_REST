
// author.routes.js
const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const authorController = require("../controllers/author.controller");
const { body, param } = require("express-validator");
const validateRequest = require("../middleware/validationResult");

// 1 Get all authors
router.get("/author", authorController.getAllAuthors);

// 2 Get an author by ID
router.get(
    "/author/:id",
    [
        param("id").isInt().withMessage("Autori ID peab olema täisarv"), // 🇪🇪 Keel ühtlustatud
        validateRequest,
    ],
    authorController.getAuthorById
);

// 3 Create a new author (admin only)
router.post(
    "/author",
    authJwt.verifyToken,
    authJwt.isAdmin,
    [
        body("full_name").notEmpty().withMessage("Nimi on kohustuslik"),
        body("bio").optional().isString().withMessage("Bio peab olema tekst"),
        validateRequest,
    ],
    authorController.createAuthor
);

// 4 Update an author by ID
router.put(
    "author/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    [
        param("id").isInt().withMessage("Autori ID peab olema täisarv"),
        body("full_name").optional().notEmpty().withMessage("Nimi ei tohi olla tühi"),
        body("bio").optional().isString().withMessage("Bio peab olema tekst"),
        validateRequest,
    ],
    authorController.updateAuthor
);

// 5 Delete an author by ID
router.delete(
    "author/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    [
        param("id").isInt().withMessage("Autori ID peab olema täisarv"),
        validateRequest,
    ],
    authorController.deleteAuthor
);

module.exports = router;