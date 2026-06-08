const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Ensure in-memory database is initialized before handling any API request
const dbReady = connectDB();
app.use('/api', async (req, res, next) => {
  await dbReady;
  next();
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/crops', require('./routes/cropRoutes'));
app.use('/api/schemes', require('./routes/schemeRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AgriConnect API is running 🌾' });
});

// Wildcard fallback for single-page layout
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🌾 AgriConnect Server running on port ${PORT}`);
  });
}

module.exports = app;
