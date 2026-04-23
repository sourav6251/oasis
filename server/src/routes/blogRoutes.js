import express from 'express';
import multer from 'multer';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// Accept up to 10 images per blog post
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(getAllBlogs)
  .post(protect, upload.array('images', 10), createBlog);

router.route('/:id')
  .get(getBlogById)
  .delete(protect, deleteBlog);

export default router;
