const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  identifier: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  filterCriteria: {
    priceRange: {
      min: { type: Number },
      max: { type: Number }
    },
    duration: {
      min: { type: Number },
      max: { type: Number }
    },
    sortBy: {
      field: { type: String, enum: ['price', 'duration', 'createdAt'] },
      order: { type: String, enum: ['asc', 'desc'] }
    }
  },
  limit: {
    type: Number,
    default: 6
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Section', sectionSchema); 