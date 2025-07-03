const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  reservationId: String,
  restaurantName: String,
  date: String,
  time: String,
  adults: Number,
  children: Number,
  customer: {
    firstName: String,
    lastName: String,
    country: String,
    email: String,
    phone: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
