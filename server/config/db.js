const mongoose = require('mongoose');

let cachedConn = null;

const connectDB = async () => {
  if (cachedConn) {
    return cachedConn;
  }

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is missing.');
    return null;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    cachedConn = conn;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;

