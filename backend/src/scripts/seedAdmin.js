const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const config = require('../config/config');

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.mongoURI);
        console.log('Connected to MongoDB');

        // Create admin user data
        const adminData = {
            name: 'Admin User',
            email: 'admin@example.com',
            password: await bcrypt.hash('admin123', 10),
            role: 'admin'
        };

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create new admin
        const admin = new Admin(adminData);
        await admin.save();
        console.log('Admin user created successfully');

    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

seedAdmin(); 