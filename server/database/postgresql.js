import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.POSTGRES_PORT),
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
        }
    }
});

export const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connected to the postgres database`);
    }
    catch(error) {
        console.error('Unable to connect to the database:', error);
    }
}