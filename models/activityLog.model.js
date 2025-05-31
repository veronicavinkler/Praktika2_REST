
// models/activityLog.model.js
const {DataTypes}= require("sequelize");
const sequelize = require("../config/db.js");

const ActivityLog = sequelize.define(
    "ActivityLog",
    {
        log_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id",
            },
        },
        action:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        entity_type:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        entity_id:{
            type: DataTypes.INTEGER,
        },
        details:{
            type: DataTypes.TEXT,
        },
        ip_address:{
            type: DataTypes.STRING(45),
        },
        createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "activity_logs",
        timestamps: false,
    }
);

module.exports = ActivityLog;