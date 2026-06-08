const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Article content is required']
  },
  summary: {
    type: String,
    maxlength: 300
  },
  category: {
    type: String,
    enum: ['crop-cultivation', 'organic-farming', 'modern-farming', 'pest-management', 'soil-health', 'irrigation', 'post-harvest', 'general'],
    required: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: 'AgriConnect Expert'
  },
  tags: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);
