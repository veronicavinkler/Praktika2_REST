const express = require("express");
const router = express.Router();

// Import other routes
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const bookRoutes = require("./book.routes");
const commentRoutes = require("./comment.routes");
const authorRoutes = require("./author.routes");
const tagRoutes = require("./tag.routes");

// Home route
router.get("/", (req, res) => {
    res.json({ message: "Server is running! Welcome!" });
});

// Register other routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/comments", commentRoutes);
router.use("/authors", authorRoutes);
router.use("/tags", tagRoutes);

module.exports = router;