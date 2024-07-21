const request = require("request");

// Method takes in the API URL with latitude and longitude coordinates.
// It properly concatenates these values together and then makes the API call.
// Method either returns an error or the weather forecast for the requested coordinates.
const forecast = (weatherURL, latitude, longitude, callback) => {
  // Add coordinates to weatherURL, encoded to prevent errors
  const requestURL =
    weatherURL +
    "&q=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  // Make request to api.weather.com and retrieve the response body
  request({ url: requestURL, json: true }, (error, { body }) => {
    // Error handling
    if (error) {
      // On error, return this to callback function to appropriately handle it
      callback("Unable to connect to weather API.");
    } else if (body.error) {
      // If nothing is returned, again return this to the callback function
      callback(
        "Unable to retrieve weather data for location, please try again."
      );
    } else {
      // If request works then return weather data for that location;
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
