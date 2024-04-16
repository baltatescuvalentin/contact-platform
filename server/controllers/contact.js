import Contact from "../models/Contact.js";
import { v4 as uuid4 } from 'uuid';
import User from "../models/User.js";

export const createContact = async (req, res) => {
    try {
        const {
            userEmail,
            email,
            phone,
            firstname,
            lastname,
        } = req.body;

        const userExists = await User.findOne({ where: { email: userEmail }});

        if (!userExists) {
            return res.status(404).json({
                message: 'User email incorrect, login',
            })
        }

        // const contactExists = await Contact.findOne({ where: { email: email }});

        // if (contactExists) {
        //     return res.status(400).json({
        //         message: 'Contact already exists!',
        //     })
        // }

        const contactUUID = uuid4();

        const newContact = await Contact.create({
            email: email,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            userEmail: userEmail,
            contactUUID: contactUUID,
        });

        res.status(201).json({
            message: 'Contact successfully added',
            contactUUID: contactUUID,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const deleteContact = async (req, res) => {
    try {
        const {
            contactUUID,
        } = req.body;

        const contactExists = await Contact.findOne({ where: { contactUUID: contactUUID }});

        if (!contactExists) {
            return res.status(404).json({
                message: 'Contact does not exist',
            })
        }

        await Contact.destroy({ where: { contactUUID: contactUUID }});
        res.status(200).json({
            message: 'Contact deleted successfully',
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const updateContact = async (req, res) => {
    try {
        const {
            email,
            phone,
            firstname,
            lastname,
            contactUUID
        } = req.body;

        const existsContact = await Contact.findOne({
            where: { contactUUID: contactUUID }
        });

        if (!existsContact) {
            return res.status(404).json({
                message: 'Contact does not exist',
            })
        }

        const updatedContact = await Contact.update({
            email: email,
            phone: phone,
            firstname: firstname,
            lastname: lastname,
        }, { where: { contactUUID: contactUUID }});

        res.status(200).json({
            updatedContact: updatedContact,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const getContactsByUserEmail = async (req, res) => {
    try {
        const {
            userEmail,
        } = req.body;

        const contacts = await Contact.findAll({ attributes: ['email', 'firstname', 'lastname', 'phone', 'contactUUID']}
            ,{ where: { userEmail: userEmail }});

        res.status(200).json({
            contacts: contacts,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

export const getContactByUUID = async (req, res) => {
    try {
        const {
            contactUUID,
        } = req.body;

        const contact = await Contact.findOne({ where: { contactUUID: contactUUID }});

        res.status(200).json({
            contact: {
                firstname: contact.firstname,
                lastname: contact.lastname,
                email: contact.email,
                phone: contact.phone,
            },
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        })
    }
}