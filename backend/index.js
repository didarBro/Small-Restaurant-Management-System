const express = require('express');
const dotenv = require('dotenv');
const menuRoutes = require('./controllers/menu/menuRoutes');
const configDB = require('./db/config');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
configDB();

// Define Routes
app.use('/api/menu', menuRoutes);

// Fallback route (optional, for health check or 404)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
