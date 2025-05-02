const Section = require('../models/section.model');

// Get all sections
exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find()
      .sort({ order: 1, createdAt: -1 });
    res.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ message: 'Failed to fetch sections' });
  }
};

// Get active sections
exports.getActiveSections = async (req, res) => {
  try {
    const sections = await Section.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    res.json(sections);
  } catch (error) {
    console.error('Error fetching active sections:', error);
    res.status(500).json({ message: 'Failed to fetch active sections' });
  }
};

// Create a new section
exports.createSection = async (req, res) => {
  try {
    const { title, description, identifier, order, isActive, filterCriteria, limit } = req.body;

    // Check if section with same identifier exists
    const existingSection = await Section.findOne({ identifier });
    if (existingSection) {
      return res.status(400).json({ message: 'Section with this identifier already exists' });
    }

    const section = new Section({
      title,
      description,
      identifier: identifier.toLowerCase(),
      order,
      isActive,
      filterCriteria,
      limit
    });

    const savedSection = await section.save();
    res.status(201).json(savedSection);
  } catch (error) {
    console.error('Error creating section:', error);
    res.status(500).json({ message: 'Failed to create section' });
  }
};

// Update a section
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, identifier, order, isActive, filterCriteria, limit } = req.body;

    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Check if new identifier conflicts with existing ones
    if (identifier && identifier !== section.identifier) {
      const existingSection = await Section.findOne({ identifier });
      if (existingSection) {
        return res.status(400).json({ message: 'Section with this identifier already exists' });
      }
      section.identifier = identifier.toLowerCase();
    }

    // Update fields
    if (title) section.title = title;
    if (description) section.description = description;
    if (order !== undefined) section.order = order;
    if (isActive !== undefined) section.isActive = isActive;
    if (filterCriteria) section.filterCriteria = filterCriteria;
    if (limit) section.limit = limit;

    const updatedSection = await section.save();
    res.json(updatedSection);
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ message: 'Failed to update section' });
  }
};

// Delete a section
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    await Section.findByIdAndDelete(id);
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({ message: 'Failed to delete section' });
  }
}; 