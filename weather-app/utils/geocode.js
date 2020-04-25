const request = require('request');

const geocode = (address, callback) => {
  const newUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidXJsZGV2IiwiYSI6ImNrOWU3aXFoZjA5dXAza21seGZkcW5ncnUifQ.NGrdfkWPBfaKUw47XuZZGw&limit=1`;

  request({ url: newUrl, json: true }, (error, response) => {
    const { features } = response.body;

    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
