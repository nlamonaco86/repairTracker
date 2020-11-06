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
    (req.user ? order.all((data) => { let hbsObject = { orders: data }; res.render("index", hbsObject); }) : res.sendFile(path.join(__dirname, "../public/splash.html")))
  });

  app.get("/login", function (req, res) {
    // If the user visits the login page while logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them to the login page
    (req.user ? order.all((data) => { let hbsObject = { orders: data }; res.render("index", hbsObject); }) : res.sendFile(path.join(__dirname, "../public/login.html")))
  });

  app.get("/tracker", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/tracker.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/orders", isAuthenticated, function (req, res) {
    order.all((data) => {
      res.render('index', { title: 'repairTracker - Employee', layout: 'main', orders: data });
    });
  });

  app.get("/invoice/:id", isAuthenticated, function (req, res) {
    order.one(req.params.id, (data) => {
      console.log(data[0].firstName);
      //create an object for handlebars to render, with options
      res.render('invoice', { title: 'Invoice - ' + data[0].id, layout: 'main', invoice: data });
    });
  });

  // ADMIN FUNCTION
  app.get("/admin", isAuthenticated, function (req, res) {
    (req.user.position === "Admin" ? res.sendFile(path.join(__dirname, "../public/admin.html")) : res.sendFile(path.join(__dirname, "../public/fourohfour.html")));
  });

  app.get("/error", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/fourohfour.html"));
  });

};