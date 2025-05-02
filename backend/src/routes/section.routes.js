const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section.controller');

// Public route
router.get('/active', sectionController.getActiveSections);

// Admin routes
router.get('/', sectionController.getAllSections);
router.post('/', sectionController.createSection);
router.put('/:id', sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);

module.exports = router; 