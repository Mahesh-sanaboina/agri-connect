const InMemoryDatabase = require('./InMemoryDatabase');

// Export mock model for Article
module.exports = InMemoryDatabase.getModel('Article');
