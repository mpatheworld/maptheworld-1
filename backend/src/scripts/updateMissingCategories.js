const mongoose = require('mongoose');
const Package = require('../models/Package');
require('dotenv').config();

// MongoDB connection string - update this to match your configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maptheworld';

async function updateMissingCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all packages that don't have a category field or have it as undefined
    const packagesWithoutCategory = await Package.find({
      $or: [
        { category: { $exists: false } },
        { category: null },
        { category: '' }
      ]
    });

    console.log(`Found ${packagesWithoutCategory.length} packages without a category`);

    // Update each package
    for (const pkg of packagesWithoutCategory) {
      console.log(`Updating package: ${pkg._id} - ${pkg.name}`);
      
      pkg.category = 'budget-friendly'; // Set default category
      await pkg.save();
      
      console.log(`Updated package: ${pkg._id} - Now has category: ${pkg.category}`);
    }

    console.log('All packages updated successfully');
  } catch (error) {
    console.error('Error updating packages:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the function
updateMissingCategories(); 