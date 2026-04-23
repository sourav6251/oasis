import Service from '../models/Service.js';
import ServicePackage from '../models/ServicePackage.js';
import ServiceCategory from '../models/ServiceCategory.js';
import { uploadImage, deleteImage } from '../utils/imageKit.js';


// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all service categories
// @route   GET /api/services/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    let categories = await ServiceCategory.find({});
    
    // Seed initial categories if none exist
    if (categories.length === 0) {
      const initialCats = [
        { name: 'Hair', icon: 'mdi-content-cut' },
        { name: 'Skin', icon: 'mdi-face-woman-shimmer' },
        { name: 'Nails', icon: 'mdi-hand-back-left' },
        { name: 'Makeup', icon: 'mdi-brush' },
        { name: 'Wellness', icon: 'mdi-spa' }
      ];
      categories = await ServiceCategory.insertMany(initialCats);
    }
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res) => {
  try {
    const { name, price, duration, description, features, category } = req.body;
    
    let imageUrl = '';
    let imageFileId = '';

    if (req.file) {
      const uploadResponse = await uploadImage(req.file.buffer, `service_${Date.now()}`);
      imageUrl = uploadResponse.url;
      imageFileId = uploadResponse.fileId;
    }

    const service = new Service({
      name,
      price,
      duration,
      img: imageUrl,
      imgFileId: imageFileId,
      description,
      features: typeof features === 'string' ? JSON.parse(features) : features,
      category: typeof category === 'string' ? JSON.parse(category) : category,
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(400).json({ message: error.message });
  }
};


// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res) => {
  try {
    const { name, price, duration, description, features, category } = req.body;

    const service = await Service.findById(req.params.id);

    if (service) {
      if (req.file) {
        // Delete old image if it exists
        if (service.imgFileId) {
          await deleteImage(service.imgFileId);
        }
        // Upload new image
        const uploadResponse = await uploadImage(req.file.buffer, `service_${Date.now()}`);
        service.img = uploadResponse.url;
        service.imgFileId = uploadResponse.fileId;
      }

      service.name = name || service.name;
      service.price = price || service.price;
      service.duration = duration || service.duration;
      service.description = description || service.description;
      service.features = features ? (typeof features === 'string' ? JSON.parse(features) : features) : service.features;
      service.category = category ? (typeof category === 'string' ? JSON.parse(category) : category) : service.category;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error('Update service error:', error);
    res.status(400).json({ message: error.message });
  }
};


// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      // Delete image from ImageKit
      if (service.imgFileId) {
        await deleteImage(service.imgFileId);
      }
      await service.deleteOne();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get all service packages
// @route   GET /api/services/packages
// @access  Public
export const getPackages = async (req, res) => {
  try {
    const packages = await ServicePackage.find({});
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a service package
// @route   POST /api/services/packages
// @access  Private/Admin
export const createPackage = async (req, res) => {
  try {
    const { name, price, originalPrice, popular, features } = req.body;

    const servicePackage = new ServicePackage({
      name,
      price,
      originalPrice,
      popular,
      features,
    });

    const createdPackage = await servicePackage.save();
    res.status(201).json(createdPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a service package
// @route   PUT /api/services/packages/:id
// @access  Private/Admin
export const updatePackage = async (req, res) => {
  try {
    const { name, price, originalPrice, popular, features } = req.body;
    const servicePackage = await ServicePackage.findById(req.params.id);

    if (servicePackage) {
      servicePackage.name = name || servicePackage.name;
      servicePackage.price = price || servicePackage.price;
      servicePackage.originalPrice = originalPrice || servicePackage.originalPrice;
      servicePackage.popular = popular !== undefined ? popular : servicePackage.popular;
      servicePackage.features = features || servicePackage.features;

      const updatedPackage = await servicePackage.save();
      res.json(updatedPackage);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a service package
// @route   DELETE /api/services/packages/:id
// @access  Private/Admin
export const deletePackage = async (req, res) => {
  try {
    const servicePackage = await ServicePackage.findById(req.params.id);

    if (servicePackage) {
      await servicePackage.deleteOne();
      res.json({ message: 'Package removed' });
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a service category
// @route   POST /api/services/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name, icon, description } = req.body;
    const category = new ServiceCategory({ name, icon, description });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a service category
// @route   PUT /api/services/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { name, icon, description } = req.body;
    const category = await ServiceCategory.findById(req.params.id);

    if (category) {
      category.name = name || category.name;
      category.icon = icon || category.icon;
      category.description = description || category.description;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a service category
// @route   DELETE /api/services/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await ServiceCategory.findById(req.params.id);

    if (category) {
      // Find all services in this category to delete their images
      const services = await Service.find({ 'category._id': category._id });
      
      // Delete images from ImageKit
      for (const service of services) {
        if (service.imgFileId) {
          try {
            await deleteImage(service.imgFileId);
          } catch (err) {
            console.error(`Failed to delete image for service ${service._id}:`, err);
          }
        }
      }

      // Delete all services in this category
      await Service.deleteMany({ 'category._id': category._id });

      // Finally delete the category
      await category.deleteOne();
      
      res.json({ message: 'Category and associated services removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
