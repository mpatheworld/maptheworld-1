const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const packageRoutes = require('./routes/packageRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/packages', packageRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/enquiries', enquiryRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app; 