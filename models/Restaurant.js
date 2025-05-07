const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  slug: String,
  area: String,
  category: String,
  image: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
