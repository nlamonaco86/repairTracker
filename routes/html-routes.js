// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

const allOrders = async (req, res) => {
  // Use raw mySQL queries to select all orders with Sequelize so that it's Handlebars-compatible
  let data = await db.sequelize.query("SELECT `Order`.`id`, `Order`.`hours`, `Order`.`rate`, `Order`.`hours` * `Order`.`rate` AS `laborTotal`, `Order`.`partsPrice`, `Order`.`partsNeeded`, `Order`.`year`, `Order`.`make`, `Order`.`model`, `Order`.`vin`, `Order`.`color`, `Order`.`issue`, `Order`.`photo`, `Order`.`received`, `Order`.`waiting`, `Order`.`inProgress`, `Order`.`complete`, `Order`.`paid`, `Order`.`inView`, SUBSTRING(`Order`.`createdAt`, 1, 10) AS `createdAt`, `Order`.`updatedAt`, `Order`.`id` AS `id`, `Customer`.`firstName` AS `firstName`, `Customer`.`lastName` AS `lastName`, `Customer`.`tel` AS `tel`, `Customer`.`email` AS `email`, `Customer`.`addr1` AS `addr1`, `Customer`.`addr2` AS `addr2`, `Customer`.`city` AS `city`, `Customer`.`state` AS `state`, `Customer`.`zip` AS `zip` FROM `Orders` AS `Order` LEFT OUTER JOIN `Customers` AS `Customer` ON `Customer`.`id` = `Order`.`CustomerId` ORDER BY `lastName`",
    { type: db.sequelize.QueryTypes.SELECT });
  return data
};

const oneInvoice = async (invoiceId, req, res) => {
  // Use raw mySQL queries to select all orders with Sequelize so that it's Handlebars-compatible
  let data = await db.sequelize.query("SELECT `Order`.`id`, `Order`.`hours`, `Order`.`rate`, TRUNCATE(`Order`.`hours` * `Order`.`rate`, 2) AS `laborTotal`, TRUNCATE(SUM(`Order`.`hours` * `Order`.`rate` + `Order`.`partsPrice`), 2) AS `subTotal`, TRUNCATE(SUM(`Order`.`hours` * `Order`.`rate` + `Order`.`partsPrice`) * .06625, 2) AS `salesTax`, TRUNCATE(SUM(`Order`.`hours` * `Order`.`rate` + `Order`.`partsPrice`) * 1.06625, 2) AS `total`, `Order`.`partsPrice`, `Order`.`partsNeeded`, `Order`.`year`, `Order`.`make`, `Order`.`model`, `Order`.`vin`, `Order`.`color`, `Order`.`issue`, `Order`.`photo`, `Order`.`received`, `Order`.`waiting`, `Order`.`inProgress`, `Order`.`complete`, `Order`.`paid`, `Order`.`inView`, SUBSTRING(`Order`.`createdAt`, 1, 10) AS `createdAt`, `Order`.`updatedAt`, `Customer`.`id` AS `CustomerId`, `Customer`.`firstName` AS `firstName`, `Customer`.`lastName` AS `lastName`, `Customer`.`tel` AS `tel`, `Customer`.`email` AS `email`, `Customer`.`addr1` AS `addr1`, `Customer`.`addr2` AS `addr2`, `Customer`.`city` AS `city`, `Customer`.`state` AS `state`, `Customer`.`zip` AS `zip` FROM `Orders` AS `Order` LEFT OUTER JOIN `Customers` AS `Customer` ON `Customer`.`id` = `Order`.`CustomerId` WHERE `Order`.`id` = :id",
    { replacements: { id: invoiceId },
      type: db.sequelize.QueryTypes.SELECT });
  return data
};

module.exports = (app) => {

  app.get("/", (req, res) => {
    // If the user visits the main page and is already logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them back to the splash page
    if (req.user && req.user.employee === 1){ allOrders().then((response) => { res.render('orders', { orders: response }); }) }  
    else { res.render('splash', { title: 'Welcome to repairTracker' }) }
  });

  app.get("/login", (req, res) => {
    // If the user visits the login page while logged in, send them to the orders page
    // query the ORM and store the response in an object for handlebars to use
    // otherwise send them to the login page
    if (req.user && req.user.employee === 1) { allOrders().then((response) => { res.render('orders', { orders: response }); }) }
    if (req.user && req.user.employee === 0) { res.render('tracker', { title: 'Track Your Order' }) }
    else { res.render('login', { title: 'Log In to repairTracker' }) }
  });

  app.get("/tracker", (req, res) => {
    res.render('tracker', { title: 'Track Your Order' })
  });

  app.get("/signup", (req, res) => {
    res.render('signup', { title: 'Create Customer Account' })
  });

  app.get("/about", (req, res) => {
    res.redirect("https://www.github.com/nlamonaco86")
  });

  app.get("/forgot", (req, res) => {
    res.render('forgot', { title: 'Forgot Password' })
  });

  app.get("/newpassword", isAuthenticated, (req, res) => {
    res.render('newpassword', { title: 'New Password', email: req.user.email })
  });

  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/orders", isAuthenticated, (req, res) => {
    if (req.user.employee === 1) {
      allOrders().then((response) => { res.render('orders', { title: 'repairTracker - Employee', orders: response }); });
    }
    else { res.render('tracker', { title: 'Track Your Order' }) }
  });

  app.get("/invoice/:id", isAuthenticated, (req, res) => {
    oneInvoice(req.params.id).then((response) => { 
      res.render('invoice', { title: 'Invoice - ' + response[0].id, layout: 'main', invoice: response });
    })
  });

  app.get("/customer/invoice/:id", (req, res) => {
    oneInvoice(req.params.id).then((response) => { 
      res.render('invoice', { title: 'Invoice - ' + response[0].id, layout: 'main', invoice: response });
    })
  });

  // ADMIN   
  app.get("/admin", isAuthenticated, (req, res) => {
    (req.user.position === "Admin" ? res.render('admin', { title: 'repairTracker - Administrator' }) : res.render('fourohfour', { title: '404 - Page Not Found' }));
  });

  app.get("/error", isAuthenticated, (req, res) => {
    res.render('fourohfour', { title: '404 - Page Not Found' });
  });

};