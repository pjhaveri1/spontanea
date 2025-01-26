const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const adventureRoutes = require('./routes/adventureRoutes'); // Import adventure routes

const app = express(); // Initialize the app

// MongoDB Connection
const mongoURI = process.env.MONGO_URI; // MongoDB URI from .env

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1); // Exit the process if the connection fails
  });

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/adventures', adventureRoutes); // Register adventure routes

// Root Endpoint
app.get('/', (req, res) => {
  res.send('API is working! Access /adventures/filter for adventures.');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Server Listening
const PORT = process.env.PORT || 5001; // Use port 5001 to avoid conflicts
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
