import { sequelize } from "../database/postgresql.js";
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        isEmail: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    }
});

User.sync().then(() => {
    console.log('User table synced');
})

export default User;