const mongoose = require('mongoose');

const cropPriceSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: [true, 'Crop name is required'],
    trim: true,
    index: true
  },
  market: {
    type: String,
    required: [true, 'Market name is required'],
    trim: true
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Cereals', 'Pulses', 'Vegetables', 'Cash Crops', 'Fruits', 'Spices', 'Others'],
    default: 'Others'
  },
  price: {
    type: Number,
    required: [true, 'Current price is required']
  },
  previousPrice: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: '₹/Quintal'
  },
  trend: {
    type: String,
    enum: ['up', 'down', 'stable'],
    default: 'stable'
  },
  minPrice: {
    type: Number
  },
  maxPrice: {
    type: Number
  },
  priceHistory: [
    {
      date: {
        type: Date,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate trend before saving
cropPriceSchema.pre('save', function(next) {
  if (this.previousPrice !== undefined) {
    if (this.price > this.previousPrice) this.trend = 'up';
    else if (this.price < this.previousPrice) this.trend = 'down';
    else this.trend = 'stable';
  }
  
  // Auto-manage priceHistory: if price is updated and doesn't exist for the day, or always push/sync
  // Let's handle this in the controller or seed script to keep the model flexible.
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('CropPrice', cropPriceSchema);
