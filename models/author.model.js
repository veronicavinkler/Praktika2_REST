const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Author = sequelize.define(
    "Author",
    {
        author_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // SERIAL PostgreSQL-is
        },
        full_name: {
            type: DataTypes.STRING(100), 
            allowNull: false, 
        },
        bio: {
            type: DataTypes.TEXT, 
            allowNull: true, 
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "Authors", 
        timestamps: false, 
    }
);

module.exports = Author;