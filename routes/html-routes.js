// Requiring path to use relative routes to HTML
let path = require("path");
const order = require("../config/order.js");
// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user visits the main page and is already logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them back to the splash page
    (req.user ? order.all((data) => { let hbsObject = { orders: data }; res.render("orders", hbsObject); }) : res.render('splash', { title: 'Welcome to repairTracker'}) )
  });

  app.get("/login", function (req, res) {
    // If the user visits the login page while logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them to the login page
    (req.user ? order.all((data) => { let hbsObject = { orders: data }; res.render("orders", hbsObject); }) : res.render('login', { title: 'Welcome to repairTracker'}) )
  });

  app.get("/tracker", function (req, res) {
    res.render('tracker', { title: 'Track Your Order'})
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/orders", isAuthenticated, function (req, res) {
    order.all((data) => {
      res.render('orders', { title: 'repairTracker - Employee', orders: data });
    });
  });

  app.get("/invoice/:id", isAuthenticated, function (req, res) {
    order.one(req.params.id, (data) => {
      //create an object for handlebars to render, with options
      res.render('invoice', { title: 'Invoice - ' + data[0].id, layout: 'main', invoice: data });
    });
  });

  // ADMIN FUNCTION
  app.get("/admin", isAuthenticated, function (req, res) {
    (req.user.position === "Admin" ?  res.render('admin', { title: 'repairTracker - Administrator' }) :  res.render('fourohfour', { title: '404 - Page Not Found'}) );
  });

  app.get("/error", isAuthenticated, function (req, res) {
    res.render('fourohfour', { title: '404 - Page Not Found'});
  });

};