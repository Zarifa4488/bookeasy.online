const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { v4: uuidv4 } = require('uuid');

router.post('/submit-reservation', async (req, res) => {
  try {
    const {
      restaurant,
      date,
      time,
      adults,
      children,
      childrenAges,
      specialRequest,
      firstName,
      lastName,
      country,
      email,
      phone
    } = req.body;

    const newReservation = new Reservation({
      reservationId: uuidv4(),
      restaurantName: restaurant,
      date,
      time,
      adults,
      children,
      customer: {
        firstName,
        lastName,
        country,
        email,
        phone
      },
      childrenAges,
      specialRequest
    });

    await newReservation.save();
    res.redirect('/reservation/thank-you'); // create this page later if you'd like
  } catch (err) {
    console.error('Error saving reservation:', err);
    res.status(500).send('Something went wrong.');
  }
});

router.get('/thank-you', (req, res) => {
  res.render('thank-you', {
    title: 'Reservation Confirmed | BookEasy.online',
    pageClass: 'simple-page'
  });
});

module.exports = router;
