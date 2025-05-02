const mongoose = require('mongoose');
const Package = require('../models/Package');
require('dotenv').config();

// MongoDB connection string - update this to match your configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maptheworld';

async function updateSpecificPackage() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the specific package
    const packageId = '6806a006fc30974635f2c36d';
    const pkg = await Package.findById(packageId);

    if (!pkg) {
      console.log(`Package with ID ${packageId} not found`);
      return;
    }

    console.log('Found package:', pkg);
    console.log('Current category:', pkg.category);

    // Set the category directly (MongoDB operation to add the field)
    const result = await Package.updateOne(
      { _id: packageId },
      { $set: { category: 'budget-friendly' } }
    );

    console.log('Update result:', result);

    // Verify the update
    const updatedPkg = await Package.findById(packageId);
    console.log('Updated package:', updatedPkg);
    console.log('New category:', updatedPkg.category);

    console.log('Package updated successfully');
  } catch (error) {
    console.error('Error updating package:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the function
updateSpecificPackage(); 