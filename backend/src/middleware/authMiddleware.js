const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find admin and check if active
        const admin = await Admin.findById(decoded.id);
        if (!admin || !admin.isActive) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        // Add admin to request
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}; 