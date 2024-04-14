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
            contactEmail,
        } = req.body;

        const newDetails = await ContactDetails.create({
            county,
            city,
            street,
            block,
            entrance,
            apartment,
            contactEmail
        });

        res.status(201).json({
            details: newDetails,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        });
    }
}

export const updateContactDetails = async (req, res) => {
    try {
        const {
            contactEmail,
            county,
            city,
            street,
            block,
            entrance,
            apartment,
        } = req.body;

        const updatedDetails = await ContactDetails.update({
            county,
            city,
            street,
            block,
            entrance,
            apartment,
        }, { where: { contactEmail: contactEmail }});

        res.status(200).json({
            newDetails: updatedDetails,
        })
    }
    catch(error) {
        res.status(500).json({
            error: error,
        });
    }
}

export const getDetailsOfContact = async (req, res) => {
    try {
        const {
            contactEmail,
        } = req.body;

        const details = await ContactDetails.findOne({
            where: { contactEmail: contactEmail }
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
            error: error,
        });
    }
}

export const deleteContactDetails = async (req, res) => {
    try {
        const {
            contactEmail,
        } = req.body;

        const existsDetails = await ContactDetails.findOne({ where: { contactEmail: contactEmail }});

        if (!existsDetails) {
            return res.status(404).json({
                message: 'Contact does not exist',
            })
        }

        await ContactDetails.destroy({ where: { contactEmail: contactEmail }});

        res.status(200).json({
            message: 'Details successfully deleted'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
}