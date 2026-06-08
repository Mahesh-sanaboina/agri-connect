const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['pest', 'disease', 'fertilizer', 'irrigation', 'seed', 'weather', 'market', 'general'],
    default: 'general'
  },
  answer: {
    type: String,
    default: ''
  },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'answered', 'closed'],
    default: 'pending'
  },
  upvotes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
