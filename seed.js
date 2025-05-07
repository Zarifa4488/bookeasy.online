require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const restaurants = require('./data/data');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas');

    await Restaurant.deleteMany();
    await Restaurant.insertMany(restaurants);

    console.log('🌱 Data seeded successfully!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  });
