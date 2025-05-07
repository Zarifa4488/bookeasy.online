const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const data = require('../data/data');

mongoose
  .connect('mongodb://127.0.0.1:27017/bookeasy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    await Restaurant.deleteMany(); // Clear old data
    await Restaurant.insertMany(data); // Insert new data

    console.log('🍽️ Restaurant data imported successfully!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error importing data:', err);
    process.exit(1);
  });
