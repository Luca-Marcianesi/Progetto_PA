import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";

const sequelize = getDatabase();

interface CalendarAttributes{
    id? : number;
    resourceId : number;
    start_time: Date;
    end_time: Date;
    cost_per_hour: number;
    archived: Date;

}

interface CalendarCreationAttributes extends Omit<CalendarAttributes, 'id' | 'archived'>{}

class Calendar extends Model<CalendarAttributes,CalendarCreationAttributes> implements CalendarAttributes{
    public id! : number;
    public resourceId!: number;
    public start_time!: Date;
    public end_time!: Date;
    public cost_per_hour!: number;
    public archived!: Date;
    
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Calendar.init(
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
        start_time: { 
            type: DataTypes.DATE, 
            allowNull: false
        },
        end_time: { 
            type: DataTypes.DATE, 
            allowNull: false
        },
        cost_per_hour: { 
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
        sequelize,
        tableName: "calendars",
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

export { Calendar };

