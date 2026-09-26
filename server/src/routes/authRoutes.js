import express from 'express';
import { registerUser, loginUser, verifyOtp, logoutUser, uploadProfilePhoto, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter, otpLimiter } from '../middleware/rateLimiters.js';
import { uploadSingleImage, handleUploadErrors } from '../utils/upload.js';

const router = express.Router();

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/verify-otp', otpLimiter, verifyOtp);
router.post('/upload-photo', protect, uploadSingleImage('photo'), handleUploadErrors, uploadProfilePhoto);
router.get('/profile', protect, getUserProfile);
router.post('/logout', protect, logoutUser);
router.put('/profile', protect, updateUserProfile);

export default router;
