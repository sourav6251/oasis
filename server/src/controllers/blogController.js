import Blog from '../models/Blog.js';
import { uploadImage, deleteImage } from '../utils/imageKit.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ publishDate: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
// @access  Public
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog (any authenticated user)
// @route   POST /api/blogs
// @access  Private (authenticated users)
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Upload all images to ImageKit
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const uploadResponse = await uploadImage(
          file.buffer,
          `blog_${Date.now()}_${file.originalname}`
        );
        return { url: uploadResponse.url, fileId: uploadResponse.fileId };
      })
    );

    const blog = new Blog({
      title,
      content,
      images: uploadedImages,
      writer: req.user._id,
      writerName: req.user.fullName || req.user.email,
      publishDate: new Date(),
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private (author or admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Only the author or an admin can delete
    if (
      blog.writer.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    // Delete all images from ImageKit
    await Promise.all(
      blog.images.map((img) => deleteImage(img.fileId))
    );

    await blog.deleteOne();
    res.json({ message: 'Blog removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
