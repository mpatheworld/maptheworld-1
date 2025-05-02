const Banner = require('../models/banner.model');

// Get all active banners
exports.getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all banners (admin)
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find()
      .sort({ order: 1, createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new banner
exports.createBanner = async (req, res) => {
  try {
    const { title, description, link, order, isActive, startDate, endDate, image } = req.body;

    if (!image || !image.url || !image.publicId) {
      return res.status(400).json({ message: 'Image (url and publicId) is required' });
    }

    const banner = new Banner({
      title,
      description,
      link,
      order,
      isActive,
      startDate,
      endDate,
      image
    });

    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a banner
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, order, isActive, startDate, endDate, image } = req.body;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Update fields only if new values are provided
    if (title) banner.title = title;
    if (description) banner.description = description;
    if (link) banner.link = link;
    if (order !== undefined) banner.order = order;
    if (isActive !== undefined) banner.isActive = isActive;
    if (startDate) banner.startDate = startDate;
    if (endDate) banner.endDate = endDate;
    if (image) banner.image = image;

    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } catch (error) {
    console.error('Error during banner update:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Delete the banner from database
    const deleteResult = await Banner.findByIdAndDelete(id);
    if (!deleteResult) {
      return res.status(500).json({ message: 'Failed to delete banner from database' });
    }

    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error in deleteBanner:', error);
    res.status(500).json({ 
      message: 'Failed to delete banner',
      error: error.message 
    });
  }
};
