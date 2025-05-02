const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const config = require('../config/config');

/**
 * Script to update an admin's password
 * Usage: 
 * node src/scripts/changeAdminPassword.js <email> <newPassword>
 * 
 * Example:
 * node src/scripts/changeAdminPassword.js admin@example.com newSecurePassword123
 */

const changeAdminPassword = async () => {
    try {
        // Get email and new password from command line arguments
        const email = process.argv[2];
        const newPassword = process.argv[3];

        if (!email || !newPassword) {
            console.error('Error: Email and new password are required');
            console.log('Usage: node src/scripts/changeAdminPassword.js <email> <newPassword>');
            process.exit(1);
        }

        // Connect to MongoDB
        await mongoose.connect(config.mongoURI);
        console.log('Connected to MongoDB');

        // Find the admin by email
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            console.error(`Error: No admin found with email ${email}`);
            process.exit(1);
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update the admin's password
        admin.password = hashedPassword;
        await admin.save();
        
        console.log(`Password updated successfully for admin: ${admin.name} (${admin.email})`);
        console.log(`Role: ${admin.role}`);

    } catch (error) {
        console.error('Error changing password:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

changeAdminPassword(); 