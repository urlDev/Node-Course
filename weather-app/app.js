const request = require("request");

const url = `http://api.weatherstack.com/current?access_key=bbc90ab5b430d8fb73d15d287c8eb8a4&query=New%20York`;

// json is for parsing the json already
request({ url: url, json: true }, (error, response) => {
  const data = response.body.current;

  if (error) {
    console.log("Unable to connect to service");
  } else if (response.body.error) {
    console.log("unable to find location");
  } else {
    console.log(
      `It is ${data.temperature} degrees out. And it feels like ${data.feelslike}`
    );
  }
});

// geocoding
const newUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoidXJsZGV2IiwiYSI6ImNrOWU3aXFoZjA5dXAza21seGZkcW5ncnUifQ.NGrdfkWPBfaKUw47XuZZGw&limit=1";

request({ url: newUrl, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect");
  } else if (!response.body.features.length) {
    console.log("Check your location query");
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(latitude, longitude);
  }
});
