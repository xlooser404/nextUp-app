import express from 'express';
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup); 
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email', verifyEmail); // Assuming you have a verifyEmail function in your controller

router.post('/forgot-password', forgotPassword); // Assuming you have a forgotPassword function in your controller
router.post('/reset-password/:token', resetPassword); 



export default router;