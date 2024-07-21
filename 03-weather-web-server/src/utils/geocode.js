const request = require("request");

// Method takes in the API URL with a real world address.
// It properly concatenates these two things together and then makes the API call.
// Method either returns an error or the placename, latitude, and longitude of the given address
const geocode = (geoURL, address, callback) => {
  // Add address to geoURL, properly encoded to prevent errors
  const requestURL = geoURL + "&q=" + encodeURIComponent(address);

  // Make request to mapbox.com
  request({ url: requestURL, json: true }, (error, { body }) => {
    // Error handling
    if (error) {
      // On error, return this to callback function to appropriately handle it
      callback("Unable to connect to geolocation API.");
    } else if (body.features.length === 0) {
      // If nothing is returned, again return this to the callback function
      callback("Unable to find location, please try again.");
    } else {
      // If request works then return place name with latitude and longitude
      callback(undefined, {
        location_short: body.features[0].properties.name_preferred,
        location_preferred: body.features[0].properties.place_formatted,
        location_full: body.features[0].properties.place_formatted,
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
      });
    }
  });
};

module.exports = geocode;
