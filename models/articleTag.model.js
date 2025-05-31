const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const ArticleTag = sequelize.define(
    "ArticleTag",
    {
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Articles", // Viitab Articles tabelile
                key: "article_id",
            },
            onDelete: "CASCADE", // Kui artikkel kustutatakse, kustutatakse ka seotud sildid
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Tags",
                key: "tag_id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        tableName: "ArticleTags",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ["article_id", "tag_id"],
            },
        ],
    }
);

module.exports = ArticleTag;