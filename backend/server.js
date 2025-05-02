const app = require('./src/app');
const mongoose = require('mongoose');
const config = require('./src/config/config');

// Connect to MongoDB
mongoose.connect(config.mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server  
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 