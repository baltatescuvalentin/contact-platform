import express from 'express';
import { getUserInformation, login, registerUser, resetPassword } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/userdata', getUserInformation);
router.put('/resetpassword', resetPassword);

export default router;