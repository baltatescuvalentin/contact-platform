import ContactDetails from "../models/ContactDetails.js";

export const createContactDetails = async (req, res) => {
    try {
        const {
            county,
            city,
            street,
            block,
            entrance,
            apartment,
            contactUUID,
        } = req.body;

        const newDetails = await ContactDetails.create({
            county,
            city,
            street,
            block,
            entrance,
            apartment,
            contactUUID
        });

        res.status(201).json({
            details: newDetails,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

export const updateContactDetails = async (req, res) => {
    try {
        const {
            contactUUID,
            county,
            city,
            street,
            block,
            entrance,
            apartment,
        } = req.body;

        const existsContact = await ContactDetails.findOne({
            where: { contactUUID: contactUUID }
        });

        if (!existsContact) {
            return res.status(404).json({
                message: 'Contact does not exist',
            })
        }

        const updatedDetails = await ContactDetails.update({
            county,
            city,
            street,
            block,
            entrance,
            apartment,
        }, { where: { contactUUID: contactUUID }});

        res.status(200).json({
            updatedDetails: updatedDetails,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

export const getDetailsOfContact = async (req, res) => {
    try {
        const {
            contactUUID,
        } = req.body;

        const details = await ContactDetails.findOne({
            where: { contactUUID: contactUUID }
        });

        res.status(200).json({
            details: {
                county: details.county,
                city: details.city,
                block: details.block,
                entrance: details.entrance,
                apartment: details.apartment,
                street: details.street,
            },
        })
    }
    catch(error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

export const deleteContactDetails = async (req, res) => {
    try {
        const {
            contactUUID
        } = req.body;

        const existsDetails = await ContactDetails.findOne({ where: { contactUUID: contactUUID }});

        if (!existsDetails) {
            return res.status(404).json({
                message: 'Contact does not exist',
            })
        }

        await ContactDetails.destroy({ where: { contactUUID: contactUUID }});

        res.status(200).json({
            message: 'Details successfully deleted'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}