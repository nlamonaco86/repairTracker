// Require models and passport
require('dotenv').config();
const db = require("../models");
const passport = require("../config/passport");
// const order = require("../config/order.js");

module.exports = function(app) {
  // LOGIN route with error handling
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // SIGNUP route with error handling
  app.post("/api/signup", function(req, res) {
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
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // LOGOUT route
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // user data client-side route
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id,
        cloudUploadName: process.env.CLOUDINARY_CLOUDNAME,
        cloudUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
      });
    }
  });

//CREATE
app.post("/api/orders", function (req, res) {
  // get values from our incoming request object and map them in an array
  let vals = Object.entries(req.body).map(e => e[1]);
  //use that array to call a create function in the model
  order.create(vals, function (results) {
    res.json({ id: results.insertId });
  });
});
// FIND ONE
app.get("/api/orders/:orderNum", (req, res) =>{
  //read all entries from the orders table
  order.findOne(req.params.orderNum, (data) => {
    res.json(data);
  });
});
//UPDATE
app.put("/api/orders/:id", (req, res) => {
  order.updateIssue(req.params.id, req.body.issue, (result) => {
    console.log(req.params.id, req.params.issue)
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
app.put("/api/orders/complete/:id", (req, res) => {
  order.updateComplete(req.params.id, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID does not exist 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
app.put("/api/orders/inProgress/:id", (req, res) => {
  order.updateInProgress(req.params.id, (result) => {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
app.put("/api/orders/waiting/:id", (req, res) => {
  order.updateWaiting(req.params.id, (result) => {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
//DELETE
app.delete("/api/orders/:id", (req, res) => {
  order.delete(req.params.id, (result) => {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
  
};
