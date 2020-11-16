// Dependencies
require('dotenv').config();
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const session = require("express-session");
// Requiring passport as configured
const passport = require("./config/passport");
const compression = require("compression");

// compress static assets for fast load times
app.use(compression());

// Serve static content for the app from the "public" directory
app.use(express.static("views"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use sessions to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import the models folder
const db = require("./models");

//Use the given routes
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/order-api-routes.js")(app);
require("./routes/email-api.js")(app);

// Start the server so it can listening to client requests.
db.sequelize.sync().then(function () {
// When the server runs for the first time, it looks to see if there is an Admin user
  db.User.findOne({ where: { position: "Admin" } })
// If there is no Admin, it will automatically create the following Admin account for you:
    .then((response) => {
      if (response === null) {
        db.User.create({
          email: "Admin@Company.com",
          password: process.env.ADMIN_PASSWORD,
          employee: 1,
          first: "Administrator",
          last: "Account",
          position: "Admin",
          phone: "9998887777",
          dob: "09/04/2020",
          ssn: "123456789",
        })
        console.log("Admin Account CREATED")
      }
      else { console.log("Admin Account FOUND") }
    })
    db.User.findOne({ where: { position: "Technician" } })
    // If there is no Technician, it will automatically create the following Technician account for you:
        .then((response) => {
          if (response === null) {
            db.User.create({
              email: "Tech2@Company.com",
              password: process.env.TECH_PASSWORD,
              employee: 1,
              first: "Technician",
              last: "Account",
              position: "Technician",
              phone: "9998887777",
              dob: "09/04/2020",
              ssn: "123456789",
            })
            console.log("Technician Account CREATED")
          }
          else { console.log("Technician Account FOUND") }
        })
// Then it's ready to go!
  app.listen(PORT, function () {
    console.log("🌎 Now working at: http://localhost:" + PORT);
  });
});