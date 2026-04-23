import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imgFileId: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
  },
  stylist: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
