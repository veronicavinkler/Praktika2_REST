const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authJwt = require("../middleware/authJwt");
const validateRequest = require("../middleware/validationResult");

// Register route
router.post(
    "/register",
    [
      body("username").notEmpty().trim().withMessage("Username is required"),
      body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
      validateRequest
    ],
    authController.register
  );

// Login route
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").notEmpty().withMessage("Password is required"),
        validateRequest,
    ],
    authController.login
);

// Protected route example (requires authentication)
router.get("/profile", authJwt.verifyToken, authController.getProfile);

module.exports = router;