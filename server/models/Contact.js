import { sequelize } from "../database/postgresql.js";
import { DataTypes } from 'sequelize';
import User from "./User.js";

const Contact = sequelize.define('Contact', {
    contactUUID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    userEmail: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'email',
        }
    }
});

Contact.sync().then(() => {
    console.log('Contact table synced');
})

export default Contact;