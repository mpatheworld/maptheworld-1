const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

// Enquiry routes
router.post('/', enquiryController.createEnquiry);
router.get('/', enquiryController.getEnquiries);
router.get('/:id', enquiryController.getEnquiry);
router.put('/:id', enquiryController.updateEnquiry);
router.delete('/:id', enquiryController.deleteEnquiry);

module.exports = router; 