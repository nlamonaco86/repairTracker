  // Require models and passport
require('dotenv').config();
const db = require("../models");
const passport = require("../config/passport");

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
  
};
