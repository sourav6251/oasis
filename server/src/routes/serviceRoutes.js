import express from 'express';
import {
  getServices,
  getCategories,
  createService,
  updateService,
  deleteService,
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { uploadSingleImage, handleUploadErrors } from '../utils/upload.js';

const router = express.Router();

// Service routes
router.route('/')
  .get(getServices)
  .post(protect, admin, uploadSingleImage('img'), handleUploadErrors, createService);

router.route('/:id')
  .put(protect, admin, uploadSingleImage('img'), handleUploadErrors, updateService)
  .delete(protect, admin, deleteService);

// Category routes
router.route('/categories')
  .get(getCategories)
  .post(protect, admin, createCategory);

router.route('/categories/:id')
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

// Package routes
router.route('/packages')
  .get(getPackages)
  .post(protect, admin, createPackage);

router.route('/packages/:id')
  .put(protect, admin, updatePackage)
  .delete(protect, admin, deletePackage);

export default router;
