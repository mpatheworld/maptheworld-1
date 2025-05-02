const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: {    
        type: String,
        required: true,
        enum: [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
            'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 
            'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
            'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
            'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
            'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
            'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
            'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
        ]
    },

    duration: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    highlights: [{
        type: String
    }],
    category: {
        type: String,
        required: true,
        enum: ['budget-friendly', 'trending', 'short-trips', 'luxury'],
        default: 'budget-friendly'
    },
    facilities: [{
        type: String
    }],
    itinerary: [{
        day: String,
        title: String,
        description: String
    }],
    inclusions: [{
        type: String
    }],
    exclusions: [{
        type: String
    }],
    knowBeforeYouGo: [{
        type: String
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    section: {
        type: String,
    },
    reviews: [{
        name: String,
        image: String,
        rating: Number,
        review: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    similarPackages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Package', packageSchema); 