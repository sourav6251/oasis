import express from 'express';
import { createContactMessage, getContactMessages } from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { publicWriteLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

router.route('/')
  .post(publicWriteLimiter, createContactMessage)
  .get(protect, admin, getContactMessages);

export default router;
