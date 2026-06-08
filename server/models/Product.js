const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['sell-crop', 'buy-seed', 'buy-fertilizer', 'rent-equipment', 'other'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  unit: {
    type: String,
    default: 'per kg'
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  state: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  contactNumber: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'expired'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
