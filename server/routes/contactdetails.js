import express from 'express';
import { createContactDetails, deleteContactDetails, getDetailsOfContact, updateContactDetails } from '../controllers/contactdetails.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', verifyToken, createContactDetails);
router.patch('/update', verifyToken, updateContactDetails);
router.post('/getDetailsOfContact', verifyToken, getDetailsOfContact);
router.delete('/delete', verifyToken, deleteContactDetails);

export default router;