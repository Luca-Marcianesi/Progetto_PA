import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";

const sequelize = getDatabase();
/*
const CalendarSlot = sequelize.define(
    "CalendarSlot",
    {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        calendarId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startTime: { 
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isHour(value: Date) {
                    if (value.getMinutes() !== 0 || value.getSeconds() !== 0 || value.getMilliseconds() !== 0) {
                        throw new Error("Start time must be at the beginning of the hour (e.g., 10:00:00)");
                    }
                }
            }
        },
        endTime: { 
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isHour(value: Date) {
                    if (value.getMinutes() !== 0 || value.getSeconds() !== 0 || value.getMilliseconds() !== 0) {
                        throw new Error("End time must be at the beginning of the hour (e.g., 11:00:00)");
                    }
                },
                isAfterStart(value: Date) {
                    if (this.startTime && value <= this.startTime) {
                        throw new Error("End time must be after start time");
                    }
                }
            }
        },
        costPerHour: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: { min: 0 }
        },

    },
    { 
        tableName: "calendar_slots",
        createdAt: false,
        updatedAt: false
    }
);

export { CalendarSlot };

*/