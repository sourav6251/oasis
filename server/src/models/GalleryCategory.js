import mongoose from 'mongoose';

const galleryCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('GalleryCategory', galleryCategorySchema);
