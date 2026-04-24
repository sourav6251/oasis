import Review from '../models/Review.js';
import { uploadImage } from '../utils/imageKit.js';

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user', 'fullName image')
      .sort({ createdAt: -1 });
    
    // Format reviews for frontend
    const formattedReviews = reviews.map(r => ({
      name: r.user?.fullName || 'Anonymous',
      image: r.user?.image || 'https://via.placeholder.com/150',
      rating: r.rating,
      text: r.review,
      services: r.services,
      date: r.createdAt,
      images: r.images.map(img => img.url)
    }));

    res.json(formattedReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { rating, services, review } = req.body;
    const userId = req.user._id;

    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResponse = await uploadImage(file.buffer, `review_${Date.now()}_${file.originalname}`);
        uploadedImages.push({
          url: uploadResponse.url,
          fileId: uploadResponse.fileId
        });
      }
    }

    const newReview = new Review({
      user: userId,
      rating,
      services: Array.isArray(services) ? services : [services],
      review,
      images: uploadedImages
    });

    const createdReview = await newReview.save();
    
    // Populate user info for immediate display if needed
    const populatedReview = await Review.findById(createdReview._id).populate('user', 'fullName image');

    res.status(201).json({
      name: populatedReview.user?.fullName || 'Anonymous',
      image: populatedReview.user?.image || 'https://via.placeholder.com/150',
      rating: populatedReview.rating,
      text: populatedReview.review,
      services: populatedReview.services,
      date: populatedReview.createdAt,
      images: populatedReview.images.map(img => img.url)
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(400).json({ message: error.message });
  }
};
