// Require models and passport
require('dotenv').config();
const db = require("../models");
const passport = require("../config/passport");
const order = require("../config/order.js");

module.exports = function (app) {
  // LOGIN route with error handling
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // SIGNUP route with error handling
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      first: req.body.first,
      last: req.body.last,
      position: req.body.position,
      phone: req.body.phone,
      dob: req.body.dob,
      ssn: req.body.ssn,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // LOGOUT route
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // user data client-side route
  app.get("/api/user_data", function (req, res) {
    (!req.user ? res.json({}) : res.json({
      email: req.user.email,
      phone: req.user.phone,
      id: req.user.id,
      first: req.user.first,
      last: req.user.last,
      position: req.user.position,
      cloudUploadName: process.env.CLOUDINARY_CLOUDNAME,
      cloudUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    }))
  });

  app.post("/api/orders", function (req, res) {
    // Data from the form gets inserted into three separate but associated tables
    // Customer/Vehicle ID's arrive from client-side to avoid any promise/async issues
    // Order entry
    db.Order.create({
      id: req.body.id,
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      vin: req.body.vin,
      issue: req.body.issue,
      photo: req.body.photo,
      received: 1,
      waiting: 0,
      inProgress: 0,
      complete: 0,
      paid: 0
    })
    // Create the customer entry
    db.Customer.create({
      id: req.body.genCustomerId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      addr1: req.body.addr1,
      addr2: req.body.addr2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      OrderId: req.body.id
    })
      .then(function () {
        res.send("success")
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  const getOneOrder = (searchId) => {
    console.log(searchId)
    return db.Order.findOne({
      where: { id: searchId },
      include: [
        { model: db.Customer, attributes: ['id', 'firstName', 'lastName', 'tel', 'email', 'addr1', 'addr2', 'city', 'state', 'zip'] }
      ]
    })
  }

  app.get("/api/orders/:id", function (req, res) {
    getOneOrder(req.params.id)
      .then(result => {
        (result === null ? res.json({ error: "No Results Found! Please try again" }) : res.json(result))
      });
  });

  // In order to minimize confusion, when a user searches by Customer last name, Sequelize will find the Customer with that last name, 
  // then find their associated order, then search the Orders table for that order, and sends it back with its associated customer
  // this is to ensure uniformity of objects sent back to the front end 
  app.get("/api/orders/named/:lastName", function (req, res) {
    db.Customer.findOne({
      where: { lastName: req.params.lastName },
      include: [
        { model: db.Order, attributes: ['id', 'year', 'make', 'model', 'vin', 'issue', 'photo', 'received', 'waiting', 'inProgress', 'complete', 'paid'] }
      ]
    })
      // Nested if/elses will send an error message to the frontend if an error occurs at any point during the search
      .then(result => {
        (result === null ? res.json({ error: "No Results Found! Please try again" }) : getOneOrder(result.Order.id)
          .then(result => { (result === null ? res.json({ error: "No Results Found! Please try again" }) : res.json(result)) }))
      })
  });

  //UPDATE
  app.put("/api/orders/:id", (req, res) => {
    db.Order.update(
      { issue: req.body.issue },
      { where: { id: req.params.id } }, (result) => {
        (result.changedRows == 0 ? res.status(404).end() : res.status(200).end())
      }
    );
  });

  app.put("/api/orders/:status/:id", (req, res) => {
      switch (req.params.status) {
        case "inProgress":
          order.updateInProgress(req.params.id, (result) => {
            (result.changedRows == 0 ? res.status(404).end() : res.status(200).end())
          });
          break;
        case "waiting":
          order.updateWaiting(req.params.id, (result) => {
            (result.changedRows == 0 ? res.status(404).end() : res.status(200).end())
          });
          break;
        case "complete":
          order.updateComplete(req.params.id, (result) => {
            (result.changedRows == 0 ? res.status(404).end() : res.status(200).end())
          });
          break;
        case "paid":
          order.updatePaid(req.params.id, (result) => {
            (result.changedRows == 0 ? res.status(404).end() : res.status(200).end())
          });
          break;
        default:
      }
  });

  //DELETE
  app.delete("/api/orders/:id", (req, res) => {
    db.Order.destroy({
      where: { id: req.params.id }
    })
      .then((data) => {
        res.json(data);
      });
  });

};