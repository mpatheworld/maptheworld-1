const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Get all sections
router.get('/', sectionController.getSections);

// Get active sections
router.get('/active', sectionController.getActiveSections);

// Get a single section
router.get('/:id', sectionController.getSection);

// Create a new section
router.post('/', sectionController.createSection);

// Update a section
router.put('/:id', sectionController.updateSection);

// Add packages to a section
router.post('/:id/packages', sectionController.addPackages);

// Remove packages from a section
router.delete('/:id/packages', sectionController.removePackages);

// Update section status
router.patch('/:id/status', sectionController.updateStatus);

// Update section order
router.patch('/:id/order', sectionController.updateOrder);

// Delete a section
router.delete('/:id', sectionController.deleteSection);

module.exports = router; 