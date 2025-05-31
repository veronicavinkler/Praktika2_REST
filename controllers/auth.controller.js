const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");

exports.getProfile = async (req, res, next) => {
    try {
        // Assuming `req.userId` is set by `authJwt.verifyToken`
        res.status(200).json({
            message: "This is your profile",
            userId: req.userId, // Include user ID from the token
        });
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
};

// Register a new user
exports.register = async (req, res, next) => {
    try {
        const { username, email, password, is_admin } = req.body;

        // Validate input
        if (!username || !email || !password) {
            const error = new Error("All fields (username, email, password) are required");
            error.status = 400;
            throw error;
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ where: { user_email: email } });
        if (existingUser) {
            const error = new Error("Email is already registered");
            error.status = 409;
            throw error;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            user_email: email,
            password_hash: hashedPassword,
            is_admin: is_admin || false,
        });

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser.user_id,
                email: newUser.user_email,
                is_admin: newUser.is_admin,
            },
        });
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
};

// Login a user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            const error = new Error("Email and password are required");
            error.status = 400;
            throw error;
        }

        // Find the user by email
        const user = await User.findOne({ where: { user_email: email } });
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        // Compare the password
        const passwordIsValid = await bcrypt.compare(password, user.password_hash);
        if (!passwordIsValid) {
            const error = new Error("Invalid credentials");
            error.status = 401;
            throw error;
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.user_id },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            user: {
                id: user.user_id,
                email: user.user_email,
                is_admin: user.is_admin,
            },
            accessToken: token,
            message: "Login successful",
        });
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
};