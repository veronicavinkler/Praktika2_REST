const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Tag = sequelize.define(
    "Tag",
    {
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, //Serial
        },
        tag_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true, // Tagab, et sildi nimi on unikaalne
        },
    },
    {
        tableName: "Tags",
        timestamps: false, // Ei ole vaja createdAt ja updatedAt välju
    }
);

module.exports = Tag;