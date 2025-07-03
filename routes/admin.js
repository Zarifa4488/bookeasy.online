const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation'); // ← NEW: Import Reservation model

// Admin Dashboard – Show all restaurants and reservations
router.get('/dashboard', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    const reservations = await Reservation.find().sort({ createdAt: -1 }); // ← NEW: Fetch reservations

    res.render('admin/dashboard', {
      layout: 'admin/admin-layout',
      title: 'Admin Dashboard | BookEasy',
      restaurants,
      reservations, // ← NEW: Pass reservations to the view
      pageClass: 'admin-page'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load dashboard.');
  }
});

// Show Create Restaurant Form
router.get('/create', (req, res) => {
  res.render('admin/create', {
    layout: 'admin/admin-layout',
    title: 'Add New Restaurant | BookEasy',
    pageClass: 'admin-page'
  });
});

// Handle New Restaurant Submission
router.post('/create', async (req, res) => {
  try {
    const { name, area, slug, status } = req.body;
    const newRestaurant = new Restaurant({ name, area, slug, status });

    await newRestaurant.save();
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to save restaurant.');
  }
});

module.exports = router;
