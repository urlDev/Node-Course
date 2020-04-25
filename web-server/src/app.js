const path = require('path');
const express = require('express');

const app = express();
const publicDirPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Can',
  });
});

/* this wont run if there is an index.html will be the root directory
app.get('', (req, res) => {
  res.send('<h1>Weather</h1>');
});
*/

/*

these will run if we go to /about or /help
but we added /about.html and /help.html
so when we visit those pages, those html
files will be shown

app.get('/help', (req, res) => {
  res.send([
    {
      name: 'Can',
      age: 32,
    },
    {
      name: 'Tiiu',
    },
  ]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
});

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Cloudy',
    location: 'Istanbul',
  });
});

*/

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log('App listening');
});
