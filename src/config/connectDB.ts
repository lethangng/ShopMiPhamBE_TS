import dotenv from "dotenv";
import { Sequelize, Dialect } from "sequelize";
dotenv.config();

const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabaseName = process.env.DB_DATABASE_NAME as string;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT as Dialect;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;

const sequelize = new Sequelize(dbDatabaseName, dbUsername, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
  dialectOptions:
    process.env.DB_SSL === "true"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  query: {
    raw: true,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection DB successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default { sequelize, connectDB };
