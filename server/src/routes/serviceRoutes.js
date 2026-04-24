import express from 'express';
import multer from 'multer';
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

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Service routes
router.route('/')
  .get(getServices)
  .post(protect, admin, upload.single('img'), createService);

router.route('/:id')
  .put(protect, admin, upload.single('img'), updateService)
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
