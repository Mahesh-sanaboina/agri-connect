const InMemoryDatabase = require('./InMemoryDatabase');

// Export mock model for User
module.exports = InMemoryDatabase.getModel('User');
