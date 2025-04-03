const express = require('express');
const app = express();
app.set('view engine','ejs');
const port = 3000;

app.get('/',(req,res)=>{
  res.render('home',{siteName:'bookeasy.online'});
});

app.listen(port,()=>{
  console.log(`Server running at http://localhost:${port}`);
});