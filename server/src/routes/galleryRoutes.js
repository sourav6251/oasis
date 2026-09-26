import express from 'express';
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadSingleImage, handleUploadErrors } from '../utils/upload.js';

const router = express.Router();

router.route('/')
  .get(getGalleryItems)
  .post(protect, admin, uploadSingleImage('image'), handleUploadErrors, createGalleryItem);

router.route('/:id')
  .put(protect, admin, uploadSingleImage('image'), handleUploadErrors, updateGalleryItem)
  .delete(protect, admin, deleteGalleryItem);

export default router;
