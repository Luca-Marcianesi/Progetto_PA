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
        costPerHour: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: { min: 0 } // Valore non negativo
        },
        archived: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: false 
        },

    },
    { 
        tableName: "calendars",
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

export { Calendar };

