import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";

const sequelize = getDatabase();

const Calendar = sequelize.define(
    "Calendar",
    {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        resourceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startTime: { 
            type: DataTypes.DATE, 
            allowNull: false
        },
        endTime: { 
            type: DataTypes.DATE, 
            allowNull: false
        },
        archived: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: false 
        },

    },
    { 
        tableName: "calendars",
        createdAt: false,
        updatedAt: false
    }
);

export { Calendar };

