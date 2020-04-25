const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
  console.log('Please provide and address');
} else {
  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      //   if there is error, we want to return from there
      // and not to call the other function
      return console.log(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(location);
      console.log(forecastData);
    });
  });
}
