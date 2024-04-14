import express from 'express';
import { createContact, deleteContact, getContactByUUID, getContactsByUserEmail } from '../controllers/contact.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', verifyToken, createContact);
router.delete('/delete', verifyToken, deleteContact);
router.post('/getContactsByUserEmail', verifyToken, getContactsByUserEmail);
router.post('/getContactByUUID', verifyToken, getContactByUUID);

export default router;