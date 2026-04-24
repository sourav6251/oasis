import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    // Array of image URLs (supports multiple images per blog)
    images: [
      {
        url: { type: String, required: true },
        fileId: { type: String, required: true },
      },
    ],
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    writerName: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
