/* Core Node Modules */
const path = require("path"); // path module for handling directories

/* npm packages */
const express = require("express"); // express package for running the web server
const hbs = require("hbs"); // hbs package for dynamic template integration with express

/* File paths */
const publicPath = path.join(__dirname, "../public"); // File path to public resources
const viewsPath = path.join(__dirname, "../templates/views"); // File path to hbs views
const partialsPath = path.join(__dirname, "../templates/partials"); // File path to hbs partials

// Initialise express web server
const app = express();
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set path for express to use public resources
app.use(express.static(publicPath));

// Route for index page
app.get("", (req, res) => {
  res.render("index", {
    pageTitle: "Weather Web App",
    myName: "Ronan Peacock",
  });
});

// Route for about page
app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About",
    myName: "Ronan Peacock",
  });
});

// Route for help page
app.get("/help", (req, res) => {
  res.render("help", {
    pageTitle: "Help",
    myName: "Ronan Peacock",
    helpMessage: "For help, please contact me at ronanjpeacock@gmail.com",
  });
});

// Route for
app.get("/help/*", (req, res) => {
  res.render("404", {
    pageTitle: "Help/404",
    myName: "Ronan Peacock",
    errorMessage: "Help Page 404 - This help article does not exist",
  });
});

// Route for 404 page - * wildcard will catch anything that has not been previously defined
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
