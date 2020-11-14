// Requiring path to use relative routes to HTML
let path = require("path");
const order = require("../config/order.js");
// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");
const user = require("../models/user.js");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user visits the main page and is already logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them back to the splash page
    (req.user && req.user.employee === 1 ? order.all((data) => { let hbsObject = { orders: data }; res.render("orders", hbsObject); }) : res.render('splash', { title: 'Welcome to repairTracker' }))
  });

  app.get("/login", function (req, res) {
    // If the user visits the login page while logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them to the login page
    if (req.user && req.user.employee === 1) { order.all((data) => { let hbsObject = { orders: data }; res.render("orders", hbsObject); }) }
    if (req.user && req.user.employee === 0) { res.render('tracker', { title: 'Track Your Order' }) }
    else { res.render('login', { title: 'Log In to repairTracker' }) }
  });

  app.get("/tracker", function (req, res) {
    res.render('tracker', { title: 'Track Your Order' })
  });

  app.get("/signup", function (req, res) {
    res.render('signup', { title: 'Create Customer Account' })
  });

  app.get("/forgot", function (req, res) {
    res.render('forgot', { title: 'Forgot Password' })
  });

  app.get("/newpassword", isAuthenticated, function (req, res) {
    res.render('newpassword', { title: 'New Password', email: req.user.email })
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/orders", isAuthenticated, function (req, res) {
    if (req.user.employee === 1) {
      order.all((data) => {
        res.render('orders', { title: 'repairTracker - Employee', orders: data });
      });
    }
    else { res.render('tracker', { title: 'Track Your Order' }) }
  });

  app.get("/invoice/:id", isAuthenticated, function (req, res) {
    order.one(req.params.id, (data) => {
      //create an object for handlebars to render, with options
      res.render('invoice', { title: 'Invoice - ' + data[0].id, layout: 'main', invoice: data });
    });
  });

  app.get("/customer/invoice/:id", function (req, res) {
    order.one(req.params.id, (data) => {
      res.render('invoice', { title: 'Invoice - ' + data[0].id, layout: 'main', invoice: data });
    });
  });

  // ADMIN FUNCTION
  app.get("/admin", isAuthenticated, function (req, res) {
    (req.user.position === "Admin" ? res.render('admin', { title: 'repairTracker - Administrator' }) : res.render('fourohfour', { title: '404 - Page Not Found' }));
  });

  app.get("/error", isAuthenticated, function (req, res) {
    res.render('fourohfour', { title: '404 - Page Not Found' });
  });

};