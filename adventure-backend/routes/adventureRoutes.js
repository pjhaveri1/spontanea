const express = require('express');
const router = express.Router();
const Adventure = require('../models/Adventure');

// Endpoint for filtering adventures
router.get('/filter', async (req, res) => {
  try {
    const { duration, budget, category } = req.query;

    // Convert duration and budget to numbers if needed
    const durationNum = parseInt(duration, 10);
    const budgetNum = parseInt(budget, 10);

    const adventures = await Adventure.find({
      ...(duration && { estimated_duration: { $lte: durationNum } }),
      ...(budget && {
        $or: [
          { estimated_price_low: { $lte: budgetNum } },
          { estimated_price_high: { $lte: budgetNum } },
        ],
      }),
      ...(category && { category: category }),
    });

    res.json(adventures);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching adventures', error: err });
  }
});

module.exports = router;
