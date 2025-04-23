const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout');

app.get('/', (req, res) => {
  res.render('home', { title: 'Home | BookEasy.online', pageClass: 'home-page' });
});

app.get('/whyus', (req, res) => {
  res.render('whyus', { title: 'Why Us | bookeasy.online', pageClass: 'simple-page' });
});
app.get('/services', (req, res) => {
  res.render('services', { title: 'Services | bookeasy.online', pageClass: 'simple-page' });
});
app.get('/policies', (req, res) => {
  res.render('policies', {
    title: 'Pricing and Policies | bookeasy.online',
    pageClass: 'simple-page'
  });
});

app.get('/restaurants', (req, res) => {
  res.render('restaurants', {
    title: 'All Restaurants | BookEasy.online',
    pageClass: 'restaurants-page'
  });
});

app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000');
});
