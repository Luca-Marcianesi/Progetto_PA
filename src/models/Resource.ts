import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";

const sequelize = getDatabase();

interface ResourceAttributes {
    id?: number;
    name: string;
    description?: string | null;
}

interface ResourceCreationAttributes extends Omit<ResourceAttributes, 'id'> {} // Campi opzionali alla creazione

class Resource extends Model<ResourceAttributes, ResourceCreationAttributes> implements ResourceAttributes {
    public id!: number;
    public name!: string;
    public description!: string | null;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Resource.init(
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
        sequelize,
        modelName: "Resource",
        tableName: "resources",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export { Resource };

