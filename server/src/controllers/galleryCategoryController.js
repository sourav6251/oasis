import GalleryCategory from '../models/GalleryCategory.js';
import Gallery from '../models/Gallery.js';
import { deleteImage } from '../utils/imageKit.js';

// @desc    Get all gallery categories
// @route   GET /api/gallery-categories
// @access  Public
export const getGalleryCategories = async (req, res) => {
  try {
    const categories = await GalleryCategory.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a gallery category
// @route   POST /api/gallery-categories
// @access  Private/Admin
export const createGalleryCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    
    const categoryExists = await GalleryCategory.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Gallery category already exists' });
    }

    const category = await GalleryCategory.create({
      name,
      icon
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a gallery category
// @route   PUT /api/gallery-categories/:id
// @access  Private/Admin
export const updateGalleryCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const category = await GalleryCategory.findById(req.params.id);

    if (category) {
      category.name = name || category.name;
      category.icon = icon || category.icon;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Gallery category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a gallery category
// @route   DELETE /api/gallery-categories/:id
// @access  Private/Admin
export const deleteGalleryCategory = async (req, res) => {
  try {
    const category = await GalleryCategory.findById(req.params.id);

    if (category) {
      // Find all gallery items in this category to delete their images
      const items = await Gallery.find({ category: category.name });
      
      // Delete images from ImageKit
      for (const item of items) {
        if (item.imgFileId) {
          try {
            await deleteImage(item.imgFileId);
          } catch (err) {
            console.error(`Failed to delete image for gallery item ${item._id}:`, err);
          }
        }
      }

      // Delete all gallery items in this category
      await Gallery.deleteMany({ category: category.name });

      // Delete the category
      await category.deleteOne();
      
      res.json({ message: 'Gallery category and associated items removed' });
    } else {
      res.status(404).json({ message: 'Gallery category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
