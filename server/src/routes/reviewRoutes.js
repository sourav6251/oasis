import express from 'express';
import { getReviews, createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadImageArray, handleUploadErrors } from '../utils/upload.js';

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(protect, uploadImageArray('images', 5), handleUploadErrors, createReview);

export default router;
