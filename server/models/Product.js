const InMemoryDatabase = require('./InMemoryDatabase');

// Export mock model for Product
module.exports = InMemoryDatabase.getModel('Product');
