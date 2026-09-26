import Blog from '../models/Blog.js';
import { uploadImage, deleteImage } from '../utils/imageKit.js';
import Subscriber from '../models/Subscriber.js';
import sendEmail from '../utils/sendEmail.js';

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

    // Automatically notify all active subscribers in background
    (async () => {
      try {
        const subscribers = await Subscriber.find({ isActive: true });
        if (subscribers && subscribers.length > 0) {
          const siteUrl = process.env.FRONTEND_URL || 'http://localhost:5001';
          const blogUrl = `${siteUrl}/beauty-tips`;
          const previewText = (savedBlog.content || '').replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);

          for (const sub of subscribers) {
            try {
              await sendEmail({
                email: sub.email,
                subject: `✨ New Beauty Tip: ${savedBlog.title}`,
                message: `Hi there! A new beauty tip "${savedBlog.title}" has just been published by ${savedBlog.writerName} on Oasis Beauty. Read it here: ${blogUrl}`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0e6d6; border-radius: 12px; background: #fffdf9;">
                    <span style="font-size: 12px; text-transform: uppercase; color: #eaa636; letter-spacing: 2px; font-weight: bold;">New Beauty Tip</span>
                    <h2 style="color: #1e1916; margin-top: 10px;">${savedBlog.title}</h2>
                    <p style="color: #777; font-size: 13px;">By ${savedBlog.writerName}</p>
                    <p style="color: #444; line-height: 1.6; margin: 20px 0;">
                      ${previewText}...
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${blogUrl}" style="background: #eaa636; color: #1e1916; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 25px; display: inline-block;">Read Full Tip</a>
                    </div>
                    <p style="color: #888; font-size: 12px; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">You received this because you subscribed to Oasis Beauty updates.</p>
                  </div>
                `,
              });
            } catch (mailErr) {
              console.error(`Failed to send email to subscriber ${sub.email}:`, mailErr);
            }
          }
        }
      } catch (subErr) {
        console.error('Subscriber notification error:', subErr);
      }
    })();

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
    const isAuthor = blog.writer && blog.writer.toString() === req.user._id.toString();
    const isAdmin = req.user.role && req.user.role.toLowerCase() === 'admin';
    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    // Delete all related images from ImageKit
    const imageDeletePromises = [];

    // 1. Array of images in blog.images
    if (Array.isArray(blog.images) && blog.images.length > 0) {
      for (const img of blog.images) {
        if (img) {
          imageDeletePromises.push(deleteImage(img.fileId, img.url));
        }
      }
    }

    // 2. Legacy single image fields (if present)
    if (blog.imageFileId || blog.image) {
      imageDeletePromises.push(deleteImage(blog.imageFileId, blog.image));
    }

    // 3. Any ImageKit image URLs embedded in blog content
    if (blog.content && typeof blog.content === 'string') {
      const imgRegex = /https:\/\/ik\.imagekit\.io\/[^\s"'<>)]+/g;
      const matches = blog.content.match(imgRegex);
      if (matches && matches.length > 0) {
        const knownUrls = new Set(
          (blog.images || []).map((img) => img.url).concat([blog.image])
        );
        for (const matchUrl of matches) {
          if (!knownUrls.has(matchUrl)) {
            imageDeletePromises.push(deleteImage(null, matchUrl));
          }
        }
      }
    }

    // Wait for all image deletions to settle
    if (imageDeletePromises.length > 0) {
      await Promise.allSettled(imageDeletePromises);
    }

    await blog.deleteOne();
    res.json({ message: 'Blog and related images removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
