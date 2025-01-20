const express = require('express');
const Adventure = require('../models/Adventure');

const router = express.Router();

// Get All Adventures or Filter by Preferences
router.get('/', async (req, res) => {
  const { category, duration, priceRange } = req.query;

  try {
    let query = {};

    if (category) query.category = category;
    if (duration) query.estimatedDuration = duration;
    if (priceRange) query.priceRange = priceRange;

    const adventures = await Adventure.find(query);
    res.json(adventures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a New Adventure
router.post('/', async (req, res) => {
  try {
    const newAdventure = new Adventure(req.body);
    const savedAdventure = await newAdventure.save();
    res.status(201).json(savedAdventure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
