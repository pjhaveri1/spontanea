const express = require('express');
const router = express.Router();
const Activity = require('../models/Adventure'); // Ensure this points to your Activity model

// Filter Endpoint
router.get('/filter', async (req, res) => {
  try {
    const duration = parseInt(req.query.duration, 10) || 0;
    const [minBudget, maxBudget] = (req.query.budget || '0-100000').split('-').map(Number);
    const category = req.query.category || '';

    const query = {
      'Estimated Duration': { $lte: duration },
      estimated_price_low: { $lte: maxBudget },
      estimated_price_high: { $gte: minBudget },
      category: { $regex: new RegExp(category, 'i') }, // Case-insensitive
    };

    console.log('Query being executed:', query); // Log the query for debugging

    const activities = await Activity.find(query).limit(3); // Execute the query
    console.log('Activities fetched:', activities);

    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error.message);
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
});

module.exports = router;
