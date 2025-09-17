import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";
import { title } from "process";

const sequelize = getDatabase();

const Request = sequelize.define(
    "Request", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        calendarId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected','invalid'),
            allowNull: false,
            defaultValue: 'pending',
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        tableName: "requests",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Request;