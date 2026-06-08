const InMemoryDatabase = require('./InMemoryDatabase');

// Export mock model for Question
module.exports = InMemoryDatabase.getModel('Question');
