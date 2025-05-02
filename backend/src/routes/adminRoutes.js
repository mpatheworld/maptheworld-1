const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/login', adminController.login);

// Protected routes
router.use(authMiddleware);

// Dashboard routes
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/dashboard/activities', adminController.getRecentActivities);

// Admin management routes (superadmin only)
router.post('/admins', adminController.createAdmin);
router.get('/admins', adminController.getAdmins);
router.patch('/admins/:id/status', adminController.updateAdminStatus);

module.exports = router; 