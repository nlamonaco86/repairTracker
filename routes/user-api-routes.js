// models and passport
require('dotenv').config();
const db = require("../models");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");
// nodemailer module
const nodemailer = require('nodemailer');
const email = require('../config/email');
// Twilio module
let twilio = require('twilio');
let accountSid = process.env.ACCOUNT_SID
let authToken = process.env.AUTH_TOKEN
let client = new twilio(accountSid, authToken);

// Configuration for Nodemailer to send Forgot Password e-mails. 
let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

module.exports = function (app) {
  // LOGIN route with error handling
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // SIGNUP route with error handling
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      // For testing purposes, this allows admin to choose a user's password, in a production version,
      // this would be omitted, and a random password would be generated server-side, hased and sent to 
      // the user as an e-mail, similar to the forgot password route below, if we were working with real people. 
      password: req.body.password,
      employee: req.body.employee,
      first: req.body.first,
      last: req.body.last,
      position: req.body.position,
      phone: req.body.phone,
      dob: req.body.dob,
      ssn: req.body.ssn,
    })
      .then(() => {
        res.json({ message: "success" });
      })
      .catch((err) => {
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

  // FORGOT PASSWORD
  app.post("/api/user_data/forgotpassword", (req, res) => {
    let resetType = req.body.type
    // Take in user email, search the database for a user where that email is a match
    db.User.findOne({ where: { email: req.body.email } })
      .then((response) => {
        // if no match, send back an error, otherwise, update the user's password to a random one
        if (response === null) { res.json({ error: "No result found. Please check the e-mail address you entered." }) }
        // Hash the random password so that it can be safely stored in the database
        else {
          let randomPassword = Math.floor(10000000 + Math.random() * 9000000).toString();
          // Update the user in DB with the hashed password, and flag their account as using a temp password
          db.User.update({ password: bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10), null), tempPassword: 1 }, { where: { id: response.id } })
          // If they selected SMS, send the temp password that way
          if (resetType === "SMS") { 
          // Create the message and send it to the user
            client.messages.create({
              body: `repairTracker: Your password has been temporarily reset to: ${randomPassword}.`,
              to: "+1" + response.phone,  
              from: process.env.PHONE_NUMBER
            })
              .then((message) => console.log(message.sid));
          }
          // Otherwise, email it to them
          else {
            let mailOptions = {
              from: process.env.EMAIL_USERNAME,
              to: response.email,
              subject: `repairTracker: Forgot Password`,
              text: `Your password has been temporarily reset to: ${randomPassword}
            If you did not request a new password, please contact your administrator.`
            };
            // send the e-mail to the user 
            transporter.sendMail(mailOptions, function (error, info) {
              // error handling
              (error ? console.log(error) : console.log('Email sent: ' + info.response))
            })
          }
        }
      })
      .then((response) => {
        // Send a success message
        res.json({ message: "success" })
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // if a user logs in with a password while marked temp, they will be redirected to a page to make a new password
  // this takes in their new password from that page and updates their account
  app.put("/api/user_data/changepassword", function (req, res) {
    console.log(req.body)
    // hash the password, update the record, and set temp to false now. 
    db.User.update({ password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null), tempPassword: 0 }, { where: { email: req.body.email } })
      .then((data) => {
        // Redirect the user to the login page
        res.json({ message: "success" })
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  })

};
