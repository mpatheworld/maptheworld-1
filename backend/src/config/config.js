require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/travel_map',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    // Add other configuration settings here
}; 