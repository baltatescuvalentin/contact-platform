import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection, sequelize } from './database/postgresql.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import contactDetailsRoutes from './routes/contactdetails.js';
import User from './models/User.js';
import Contact from './models/Contact.js';
import ContactDetails from './models/ContactDetails.js';
import setupAssociations from './models/associations.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);
app.use('/contactdetails', contactDetailsRoutes);

const PORT = parseInt(process.env.PORT) || 3001;

User.hasMany(Contact, {
    foreignKey: 'userEmail',
    onDelete: 'cascade',
});
Contact.belongsTo(User, {
    foreignKey: 'userEmail',
});

Contact.hasMany(ContactDetails, {
    foreignKey: 'contactEmail',
    onDelete: 'cascade',
});
ContactDetails.belongsTo(Contact, {
    foreignKey: 'contactEmail',
});

await dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });