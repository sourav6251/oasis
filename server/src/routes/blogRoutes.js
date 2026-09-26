import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadImageArray, handleUploadErrors } from '../utils/upload.js';

const router = express.Router();
// Accept up to 10 images per blog post (size/type limited in utils/upload.js)

router.route('/')
  .get(getAllBlogs)
  .post(protect, uploadImageArray('images', 10), handleUploadErrors, createBlog);

router.route('/:id')
  .get(getBlogById)
  .delete(protect, deleteBlog);

export default router;
