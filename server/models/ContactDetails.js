import { sequelize } from "../database/postgresql.js";
import { DataTypes } from 'sequelize';
import Contact from "./Contact.js";

const ContactDetails = sequelize.define('ContactDetails', {
    county: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    street: {
        type: DataTypes.STRING,
    },
    block: {
        type: DataTypes.STRING,
    },
    entrance: {
        type: DataTypes.STRING,
    },
    apartment: {
        type: DataTypes.STRING,
    },
    contactEmail: {
        type: DataTypes.STRING,
        references: {
            model: Contact,
            key: 'email',
        }
    }
});

ContactDetails.sync().then(() => {
    console.log('ContactDetails table synced');
})

export default ContactDetails;