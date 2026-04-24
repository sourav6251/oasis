import express from 'express';
import {
  getGalleryCategories,
  createGalleryCategory,
  updateGalleryCategory,
  deleteGalleryCategory
} from '../controllers/galleryCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGalleryCategories)
  .post(protect, admin, createGalleryCategory);

router.route('/:id')
  .put(protect, admin, updateGalleryCategory)
  .delete(protect, admin, deleteGalleryCategory);

export default router;
