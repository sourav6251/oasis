import Gallery from '../models/Gallery.js';
import { uploadImage, deleteImage } from '../utils/imageKit.js';

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Private/Admin
export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, description, duration, stylist } = req.body;
    
    let imageUrl = '';
    let imageFileId = '';

    if (req.file) {
      const uploadResponse = await uploadImage(req.file.buffer, `gallery_${Date.now()}`);
      imageUrl = uploadResponse.url;
      imageFileId = uploadResponse.fileId;
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }

    const item = new Gallery({
      title,
      category,
      image: imageUrl,
      imgFileId: imageFileId,
      description,
      duration,
      stylist
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGalleryItem = async (req, res) => {
  try {
    const { title, category, description, duration, stylist } = req.body;

    const item = await Gallery.findById(req.params.id);

    if (item) {
      if (req.file) {
        if (item.imgFileId) {
          await deleteImage(item.imgFileId);
        }
        const uploadResponse = await uploadImage(req.file.buffer, `gallery_${Date.now()}`);
        item.image = uploadResponse.url;
        item.imgFileId = uploadResponse.fileId;
      }

      item.title = title || item.title;
      item.category = category || item.category;
      item.description = description || item.description;
      item.duration = duration || item.duration;
      item.stylist = stylist || item.stylist;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (item) {
      if (item.imgFileId) {
        await deleteImage(item.imgFileId);
      }
      await item.deleteOne();
      res.json({ message: 'Gallery item removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
