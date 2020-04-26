const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Can',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Can',
    name: 'Can',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'What would you like us to help you about?',
    title: 'Help',
    name: 'Can',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  } else {
    geocode(
      req.query.address,
      // in here, we set an empty object as default
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          //   if there is error, we want to return from there
          // and not to call the other function
          return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            address: req.query.address,
            location,
            forecastData,
          });
        });
      }
    );
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    // return here will stop the next code from running
    // if it matches
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
  });
});

// this matches everything that hasnt been set
// also it has to be the last page
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page you are looking for does not exist',
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


*/

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log('App listening on ' + port);
});
