import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    //to use locally un comment this and add your env data in .env file for you local postgres database
    // database: process.env.POSTGRES_DATABASE,
    // username: process.env.POSTGRES_USERNAME,
    // password: process.env.POSTGRES_PASSWORD,
    // host: process.env.POSTGRES_HOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.POSTGRES_PORT),
    dialect: 'postgres',
    //to use locally comment the rows below
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