import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  services: {
    type: [String],
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  images: [
    {
      url: { type: String, required: true },
      fileId: { type: String, required: true },
    }
  ],
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
