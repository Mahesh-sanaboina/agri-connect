const InMemoryDatabase = require('../models/InMemoryDatabase');

const connectDB = async () => {
  try {
    console.log('🔄 Initializing in-memory database...');
    await InMemoryDatabase.initialize();
    console.log('✅ In-memory database initialized successfully with seed data!');
  } catch (error) {
    console.error(`❌ In-memory database initialization failed: ${error.message}`);
  }
};

module.exports = connectDB;
