import express from 'express';
import multer from 'multer';
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(getGalleryItems)
  .post(protect, admin, upload.single('image'), createGalleryItem);

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateGalleryItem)
  .delete(protect, admin, deleteGalleryItem);

export default router;
