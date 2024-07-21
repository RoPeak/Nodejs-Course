/***************************************************/
/*                                                 */
/*                    Imports                      */
/*                     vvvvv                       */
/***************************************************/

/* Core Node Modules */
const path = require("path"); // path module for handling directories

/* npm packages */
const request = require("request"); // request package for accessing weather and geolocation APIs
const express = require("express"); // express package for running the web server
const hbs = require("hbs"); // hbs package for dynamic template integration with express

/* Custom Utils */
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

/* File paths */
const publicPath = path.join(__dirname, "../public"); // File path to public resources
const viewsPath = path.join(__dirname, "../templates/views"); // File path to hbs views
const partialsPath = path.join(__dirname, "../templates/partials"); // File path to hbs partials

/* API Keys from .env file */
const dotenv = require("dotenv");
dotenv.config();
const weatherKey = process.env.WEATHER_API_KEY;
const geoKey = process.env.GEOCODING_API_KEY;

/* API URLs */
const weatherURL =
  "https://api.weatherapi.com/v1/forecast.json?key=" + weatherKey;
const geoURL =
  "https://api.mapbox.com/search/geocode/v6/forward?access_token=" + geoKey;

/***************************************************/
/*                                                 */
/*                 Main Execution                  */
/*                     vvvvv                       */
/***************************************************/

// Initialise express web server
const app = express();
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set path for express to use public resources
app.use(express.static(publicPath));

/* Route for index page */
app.get("", (req, res) => {
  res.render("index", {
    pageTitle: "Weather Web App",
    myName: "Ronan Peacock",
  });
});

/* Route for about page */
app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About",
    myName: "Ronan Peacock",
  });
});

/* Route for help page */
app.get("/help", (req, res) => {
  res.render("help", {
    pageTitle: "Help",
    myName: "Ronan Peacock",
    helpMessage: "For help, please contact me at ronan@peacock.com",
  });
});

/* Route for weather page */
app.get("/weather", (req, res) => {
  // Error handling - address required for weather request
  if (!req.query.address) {
    return res.send({
      error: "address must be entered",
    });
  }

  // Pinpoint coords of given address, retrieve weather data and then send formatted data to page
  geocode(
    geoURL,
    req.query.address,
    (
      geoError,
      { location_short, location_pref, location_full, latitude, longitude } = {}
    ) => {
      // If error is returned by geocode function then abort and report error
      if (geoError) {
        return res.send({ error: geoError });
      }

      // If coordinates were returned from geocode function then retrieve weather data
      forecast(
        weatherURL,
        latitude,
        longitude,
        (forecastError, weatherData) => {
          // If error is returned by forecast function then abort and report error
          if (forecastError) {
            return res.send({ error: forecastError });
          }

          // Retrieve useful fields from returned data
          let weatherFormatted = {
            location: {
              short: location_short,
              preferred: location_pref,
              full: location_full,
              lat: latitude,
              long: longitude,
            },
            forecast: {
              desc: weatherData.current.condition.text,
              currTime: weatherData.location.localtime,
              updateTime: weatherData.current.last_updated,
              temp_c: weatherData.current.temp_c,
              temp_f: weatherData.current.temp_f,
              precip_mm: weatherData.current.precip_mm,
              precip_in: weatherData.current.precip_in,
              icon: weatherData.current.condition.icon,
            },
          };

          // Concatenate useful data into a summary attribute
          // (must be done after object is initialised)
          weatherFormatted.forecast.summary =
            "It is currently " +
            weatherFormatted.forecast.temp_c +
            "\u00B0C in " +
            weatherFormatted.location.short +
            ". \nThere is expected to be " +
            weatherFormatted.forecast.precip_mm +
            'mm of precipitation. \nToday is described as "' +
            weatherFormatted.forecast.desc.toLowerCase() +
            '"\n(Accurate as of ' +
            weatherFormatted.forecast.updateTime +
            ")";

          console.log(weatherFormatted);

          // Send the weather data
          res.send(weatherFormatted);
        }
      );
    }
  );
});

/* Route for 404 page ('*' wildcard catches anything not already defined) */
app.get("*", (req, res) => {
  res.render("404", {
    pageTitle: "404",
    myName: "Ronan Peacock",
    errorMessage: "Page 404 - This page does not exist",
  });
});

// Start express web server on port:3000
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
