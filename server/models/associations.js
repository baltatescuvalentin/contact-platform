import Contact from "./Contact.js";
import ContactDetails from "./ContactDetails.js";
import User from "./User.js";

export default function setupAssociations() {
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
}