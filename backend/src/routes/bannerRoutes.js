const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');

// Public route
router.get('/active', bannerController.getActiveBanners);

// Admin routes
router.get('/', bannerController.getAllBanners);
router.post('/', bannerController.createBanner);         // JSON-based
router.put('/:id', bannerController.updateBanner);       // JSON-based
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;
