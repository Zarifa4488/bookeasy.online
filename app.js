require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const Restaurant = require('./models/Restaurant');

const app = express();

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine & layout setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // default layout

// Public Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home | BookEasy.online', pageClass: 'home-page' });
});

app.get('/whyus', (req, res) => {
  res.render('whyus', { title: 'Why Us | BookEasy.online', pageClass: 'simple-page' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Services | BookEasy.online', pageClass: 'simple-page' });
});

app.get('/policies', (req, res) => {
  res.render('policies', {
    title: 'Pricing and Policies | BookEasy.online',
    pageClass: 'simple-page'
  });
});

app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.render('restaurants', {
      title: 'All Restaurants | BookEasy.online',
      pageClass: 'simple-page',
      restaurants
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/suggest-a-restaurant', (req, res) => {
  res.render('suggest-a-restaurant', {
    title: 'Suggest a Restaurant | BookEasy.online',
    pageClass: 'simple-page'
  });
});

app.get('/restaurant/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ slug: req.params.slug });

    if (!restaurant) {
      return res.status(404).send('Restaurant Not Found');
    }

    res.render('restaurant-detail', {
      restaurant,
      title: `${restaurant.name} | BookEasy.online`,
      pageClass: 'simple-page'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/restaurant/:slug/reserve', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ slug: req.params.slug });

    if (!restaurant) {
      return res.status(404).send('Restaurant Not Found');
    }

    res.render('reservation-form', {
      restaurant,
      title: `Reserve at ${restaurant.name} | BookEasy.online`,
      pageClass: 'simple-page'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Admin Routes (loads views with layout: 'admin/layout')
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const reservationRoutes = require('./routes/reservation');
app.use('/reservation', reservationRoutes);

// Start Server
app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000');
});
