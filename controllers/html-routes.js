const express = require("express");
const htmlrouter = express.Router();
const path = require("path");

// Import the model to use it
const order = require("../models/order.js");

//Get the splash page
htmlrouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/splash.html"));
});
//Get the tracker page
htmlrouter.get("/tracker", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/tracker.html"));
});
//Get the login page
htmlrouter.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});
//Get the orders page
htmlrouter.get("/orders", (req, res) =>{
  //read all entries from the orders table
  order.all((data) => {
    //store them in an object for handlebars to use
    let hbsObject = {
      orders: data
    };
    res.render("index", hbsObject);
  });
});

// Export the routes for server.js to use.
module.exports = htmlrouter;