// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Import the model to use it
const order = require("../config/order.js");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user visits the main page and is already logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them back to the splash page
    (req.user ? order.all((data) => { let hbsObject = { orders: data }; res.render("index", hbsObject); }) : res.sendFile(path.join(__dirname, "../public/splash.html")))
  });

  app.get("/login", function(req, res) {
    // If the user visits the login page while logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them to the login page
    (req.user ? order.all((data) => { let hbsObject = { orders: data }; res.render("index", hbsObject); }) : res.sendFile(path.join(__dirname, "../public/login.html")))
  });

  app.get("/tracker", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tracker.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/orders", isAuthenticated, function(req, res) {
    order.all((data) => {
      //store them in an object for handlebars to use
      let hbsObject = {
        orders: data
      };
      res.render("index", hbsObject);
    });
  });

  app.get("/invoice", isAuthenticated, function(req, res) {
    order.one((data) => {
      //store them in an object for handlebars to use
      let hbsObject = {
        invoice: data
      };
      console.log(hbsObject)
      res.render("invoice", hbsObject);
    });
  });

  // ADMIN FUNCTION
  app.get("/admin", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  });
};