const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Scheme title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Scheme description is required']
  },
  eligibility: {
    type: String,
    required: true
  },
  benefits: {
    type: String,
    required: true
  },
  documents: [{
    type: String
  }],
  applicationProcess: {
    type: String
  },
  applyLink: {
    type: String
  },
  category: {
    type: String,
    enum: ['insurance', 'subsidy', 'loan', 'training', 'infrastructure', 'other'],
    default: 'other'
  },
  ministry: {
    type: String,
    default: 'Ministry of Agriculture'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scheme', schemeSchema);
