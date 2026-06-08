const InMemoryDatabase = require('./InMemoryDatabase');

// Export mock model for CropPrice
module.exports = InMemoryDatabase.getModel('CropPrice');
