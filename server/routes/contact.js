import express from 'express';
import { createContact, deleteContact, getAllContacts, getContactByUUID, getContactsByUserEmail, updateContact } from '../controllers/contact.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', verifyToken, createContact);
router.delete('/delete', verifyToken, deleteContact);
router.post('/getContactsByUserEmail', verifyToken, getContactsByUserEmail);
router.post('/getContactByUUID', verifyToken, getContactByUUID);
router.patch('/update', verifyToken, updateContact);
router.get('/getAllContacts', getAllContacts);

export default router;