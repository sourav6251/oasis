import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, verifyOtp, uploadProfilePhoto, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOtp);
router.post('/upload-photo', protect, upload.single('photo'), uploadProfilePhoto);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
