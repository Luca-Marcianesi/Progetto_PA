import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";
import { title } from "process";
import { enumReservationStatus } from "../utils/db_const.js";

const sequelize = getDatabase();

interface ReservationAttributes {
    id?: number;
    calendar_id: number;
    user_id: number;
    start_time: Date;
    end_time: Date;
    title: string;
    status: enumReservationStatus;
    reason?: string;
    handled_by?: number;
    createdAt?: Date;
    updatedAt?: Date; 
}
interface ReservationCreationAttributes extends Omit<ReservationAttributes, 'id'  | 'reason' | 'handled_by'> {}

class Reservation extends Model<ReservationAttributes, ReservationCreationAttributes> implements ReservationAttributes {
    public id!: number;
    public calendar_id!: number;
    public user_id!: number;
    start_time!: Date;
    end_time!: Date;
    public title!: string;
    public handled_by!: number;
    public status!: enumReservationStatus;
    public reason!: string;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    }

Reservation.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        calendar_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull:false,
            validate: {
                 isAfterStart(value: Date) {
                    if (this.startTime && value <= this.startTime) {
                    throw new Error("endTime deve essere maggiore di startTime");
                    }
                }
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected','invalid','cancel'),
            allowNull: false,
            defaultValue: 'pending',
        },
        handled_by:{
            type: DataTypes.INTEGER,
            allowNull: true

        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: "Reservation",
        tableName: "requests",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export {Reservation};