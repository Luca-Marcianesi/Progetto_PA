import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";

const sequelize = getDatabase();

const Resource = sequelize.define(
    "Resource",
    {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        description: { 
            type: DataTypes.STRING, 
            allowNull: true
        },
    },
    { 
        tableName: "resources",
        createdAt: false,
        updatedAt: false,
    }
);

export { Resource };

