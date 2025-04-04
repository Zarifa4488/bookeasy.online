const express = require('express');
const app = express();
const path = require('path');


app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home'); // this looks for views/home.ejs
});

app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000');
});