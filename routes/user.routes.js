const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const userController = require("../controllers/user.controller");
const { body, param } = require("express-validator");
const validateRequest = require("../middleware/validationResult");

// 1 Get all users
router.get(
    "/user",
    authJwt.verifyToken,
    userController.getAllUsers);

// 2 Get a single user by ID
router.get(
    "/user/:id",
    authJwt.verifyToken,
    [
        param("id").isInt().withMessage("Kasutaja ID peab olema täisarv"), // 🇪🇪 Keel ühtlustatud
        validateRequest,
    ],
    userController.getUserById
);

// 3 Create a new user
router.post(
    "/user",
    authJwt.verifyToken,
    [
        body("username").notEmpty().withMessage("Kasutajanimi on kohustuslik"),
        body("email").isEmail().withMessage("E-post peab olema kehtiv"),
        body("password").notEmpty().withMessage("Parool on kohustuslik"),
        validateRequest,
    ],
    userController.createUser
);

// 4 Update a user by ID
router.put(
    "user/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    [
        param("id").isInt().withMessage("Kasutaja ID peab olema täisarv"),
        body("email").optional().isEmail().withMessage("E-post peab olema kehtiv"),
        body("password").optional().notEmpty().withMessage("Parool ei tohi olla tühi"),
        validateRequest,
    ],
    userController.updateUser
);

// 5 Delete a user by ID
router.delete(
    "user/:id",
    authJwt.verifyToken,
    authJwt.isAdmin,
    [
        param("id").isInt().withMessage("Kasutaja ID peab olema täisarv"),
        validateRequest,
    ],
    userController.deleteUser
);

module.exports = router;