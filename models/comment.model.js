// models/comment.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Comment = sequelize.define("Comment", {
    comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "user_id",
        },
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "books",
            key: "book_id",
        },
    },
}, {
    tableName: "comments",
    timestamps: false
});

module.exports = Comment;