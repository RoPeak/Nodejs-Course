// Require package for handling requests
const request = require("request");

// Custom utils
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Load API keys from .env file into process.env using the dotenv package
const dotenv = require("dotenv");
dotenv.config();

// Store API keys
const weatherKey = process.env.WEATHER_API_KEY;
const geoKey = process.env.GEOCODING_API_KEY;

// Base url for making requests to api.weatherapi.com
const weatherURL =
  "https://api.weatherapi.com/v1/forecast.json?key=" + weatherKey;

// Base url for making requests to api.mapbox.com
const geoURL =
  "https://api.mapbox.com/search/geocode/v6/forward?access_token=" + geoKey;

// *** Main execution ***

// Retrieve desired location from command line arg
const userLocation = process.argv[2];

// No location entered
if (!userLocation) {
  console.log("Please provide a location as an argument!");
  process.exit(1);
}

// Pinpoint coords of that location, retrieve weather data and then output formatted data to user
geocode(
  geoURL,
  userLocation,
  (geoError, { location, latitude, longitude } = {}) => {
    // If error is returned by geocode function then abort and report error
    if (geoError) {
      return console.log(geoError);
    }

    // If coordinates were returned from geocode() then retrieve weather data
    forecast(weatherURL, latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        // If error is returned by forecast function then abort and report error
        return console.log(forecastError);
      }
      console.log(location + ":");
      console.log(forecastData);
    });
  }
);
