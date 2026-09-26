import express from 'express';
import { subscribe, getSubscribers } from '../controllers/subscriberController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { publicWriteLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

router.route('/')
  .post(publicWriteLimiter, subscribe)
  .get(protect, admin, getSubscribers);

export default router;
