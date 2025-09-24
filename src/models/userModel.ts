import { DataTypes, Model } from "sequelize";
import { getDatabase } from "../database/database.js";
import { Reservation } from "./reservationModel.js";

const sequelize = getDatabase();

interface UserAttributes {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
    token?: number | null;
}
interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'role' | 'token'> {} // Campi opzionali alla creazione

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public surname!: string;
    public email!: string;
    public password!: string;
    public role!: "admin" | "user";
    public token!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    }


User.init(
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
        surname: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        email: { 
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true,
            validate: { isEmail: true //verifica formato email
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                is: /^[0-9a-f]{64}$/i,  //regex per funzioni hash come SHA-256
            }

        },
        role: { 
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: "user" 
        },
        token: { 
            type: DataTypes.INTEGER, 
            allowNull: true,
            defaultValue: 1000,
            validate: { min: 0 }
        },

    },
    {    
        sequelize,
        modelName: "User",
        tableName: "users",
    }
);

User.hasMany(Reservation, { foreignKey: 'user_id', as: 'requests' });
Reservation.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Reservation, { foreignKey: 'handled_by', as: 'handledRequests' }); 
Reservation.belongsTo(User, { foreignKey: 'handled_by', as: 'handler' });

export { User };

