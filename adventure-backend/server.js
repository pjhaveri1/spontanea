const express = require('express');
const cors = require('cors');
const adventureRoutes = require('./routes/adventureRoutes'); // Update the path as necessary

const app = express(); // Initialize the app here

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors()); // Enable CORS

// Routes
app.use('/adventures', adventureRoutes); // Register the routes after initializing the app

// Server Listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
