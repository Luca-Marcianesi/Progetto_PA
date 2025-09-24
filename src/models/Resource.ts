import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";
import { Calendar } from "./Calendar.js";

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

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        
    }
);

Resource.hasMany(Calendar, { foreignKey: 'resource_id', as: 'calendars' });
Calendar.belongsTo(Resource, { foreignKey: 'resource_id', as: 'resource' });

export { Resource };

