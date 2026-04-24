import express from 'express';
import multer from 'multer';
import { getReviews, createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(getReviews)
  .post(protect, upload.array('images', 5), createReview);

export default router;
