const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bbc90ab5b430d8fb73d15d287c8eb8a4&query=${latitude},${longitude}`;
  //   const data = response.body.current;

  request({ url, json: true }, (error, response) => {
    const { error: responseError, current } = response.body;
    if (error) {
      callback('Unable to connect', undefined);
    } else if (responseError) {
      callback('Unable to find location. Try another location', undefined);
    } else {
      callback(
        undefined,
        `It is ${current.temperature} degrees out. And it feels like ${response.body.current.feelslike} degrees celcius`
      );
    }
  });
};

module.exports = forecast;
