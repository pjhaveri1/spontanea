const mongoose = require('mongoose');

const adventureSchema = new mongoose.Schema({
  activityId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  priceRange: { type: String },
  estimatedDuration: { type: String },
  rating: { type: Number },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  tags: { type: String },
  photos: { type: String },
  overview: { type: String },
  description: { type: String },
  reviews: { type: String },
  route: { type: String },
  estimated_price_low: { type: Number },
  estimated_price_high: { type: Number },
});

module.exports = mongoose.model('Activity', adventureSchema, 'activities'); // Explicitly specify the collection name
