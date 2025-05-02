const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Get all packages with optional filters
router.get('/', packageController.getPackages);

// Get featured packages
router.get('/featured', packageController.getFeaturedPackages);

// Search packages
router.get('/search', packageController.searchPackages);

// Get packages by category
router.get('/category/:category', packageController.getPackagesByCategory);

// Get a single package
router.get('/:id', packageController.getPackage);

// Create a new package
router.post('/', packageController.createPackage);

// Update a package
router.put('/:id', packageController.updatePackage);

// Update package status
router.patch('/:id/status', packageController.updateStatus);

// Update package featured status
router.patch('/:id/featured', packageController.updateFeatured);

// Add a review to a package
router.post('/:id/reviews', packageController.addReview);

// Delete a package
router.delete('/:id', packageController.deletePackage);

module.exports = router; 