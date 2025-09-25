import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelize: Sequelize | null = null;

// Return always the same instace of Sequelize using the Pattern Sigleton

export const getDatabase = (): Sequelize => {
  if(!sequelize) {
    sequelize = new Sequelize(
      process.env.DB_NAME || "mydb",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "supersecret",
      {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        logging: false,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        retry: {
          max: 5,
        },
      }
    );
  }
  return sequelize;
}

export const closeDatabase = async (): Promise<void> => {
  if (sequelize) {
    await sequelize.close();
    sequelize = null;
  }
};

export const reconnectDatabase = async (): Promise<Sequelize> => {
  await closeDatabase();
  return getDatabase();
};
