const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define("Book", {
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Authors",
            key: "author_id",
        },
    },
    genre: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "books",
    timestamps: false
});

module.exports = Book;