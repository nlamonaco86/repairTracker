// Require models and passport
require('dotenv').config();
const db = require("../models");
const passport = require("../config/passport");
const order = require("../config/order.js");
const { v4: uuidv4 } = require('uuid');
const { compareSync } = require('bcryptjs');

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
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        phone: req.user.phone,
        id: req.user.id,
        first: req.user.first,
        last: req.user.last,
        position: req.user.position,
        cloudUploadName: process.env.CLOUDINARY_CLOUDNAME,
        cloudUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
      });
    }
  });
    // assign generated CustomerID to Order.CustomerId
    // assign generated VehicleID to Order.VehicleId
    // no longer need orderNum column then, and can combine all orderNum/id frontend functions

//   INSERT INTO Customers (id, firstName, lastName, tel, email, addr1, addr2, city, state, zip, createdAt, updatedAt)
//  VALUES ('4214', 'Penelope','King','908-555-1234', 'pKing73@email.com', '123 main st', 'apt 2', 'anytown', 'anystate', '12345', '2020-09-29 17:45:51', '2020-09-29 17:45:51' );

// INSERT INTO Orders (id, issue, orderNum, photo, received, waiting, inProgress, complete, paid, createdAt, updatedAt, CustomerId)
//  VALUES ('62948765', 'the issue', '62948765', 'rust.jpg', '1','0','0','0', '0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '4214' );

// INSERT INTO Orders (id, year, make, model, vin, color, createdAt, updatedAt, OrderId, CustomerId)
// VALUES (...);

app.post("/api/orders", function (req, res) {
  // Data from the form gets inserted into three separate but associated tables
  // Customer/Vehicle ID's arrive from client-side to avoid any promise/async issues
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
      zip: req.body.zip
    })
// Vehicle entry
    db.Vehicle.create({
      id: req.body.genVehicleId,
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      vin: req.body.vin,
    })
    db.Order.create({
      CustomerId: req.body.genCustomerId,
      VehicleId: req.body.genVehicleId,
      issue: req.body.issue,
      orderNum: req.body.orderNum,
      photo: req.body.photo,
      received: 1,
      waiting: 0,
      inProgress: 0,
      complete: 0,
      paid: 0
    })    
      .then(function () {
        res.send("success")
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/orders/:orderNum", function (req, res) {
    db.Order.findOne({
      where: { orderNum: req.params.orderNum }
    })
      .then(result => {
        res.json(result);
      });
  });

  app.get("/api/orders/named/:lastName", function (req, res) {
    console.log(req.params)
    db.Order.findOne({
      where: { lastName: req.params.lastName }
    })
      .then(result => {
        res.json(result);
      });
  });

  //UPDATE
  app.put("/api/orders/:id", (req, res) => {
    db.Order.update(
      { issue: req.body.issue },
      { where: { id: req.params.id } }, (result) => {
        if (result.changedRows == 0) {
          // If no rows were changed, then the ID does not exist 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      }
    );
  });

  // app.put("/api/orders/:status/:id", (req, res) => {
  //   console.log(req.params)
  //   console.log(req.body)
  //   db.Order.update(
  //     { received: 0,
  //     inProgress: req.body.inProgress,
  //     waiting: req.body.waiting,
  //     complete: req.body.complete }, 
  //     { where: { id: req.params.id } }, (result) => {
  //       if (result.changedRows == 0) {
  //         // If no rows were changed, then the ID does not exist 404
  //         return res.status(404).end();
  //       } else {
  //         res.status(200).end();
  //       }
  //     }
  //   );
  // });

  app.put("/api/orders/complete/:id", (req, res) => {
    console.log(req.body)
    order.updateComplete(req.params.id, (result) => {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID does not exist 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  app.put("/api/orders/paid/:id", (req, res) => {
    console.log(req.body)
    order.updatePaid(req.params.id, (result) => {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  app.put("/api/orders/inProgress/:id", (req, res) => {
    console.log(req.body)
    order.updateInProgress(req.params.id, (result) => {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  app.put("/api/orders/waiting/:id", (req, res) => {
    console.log(req.body)
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
    db.Order.destroy({
      where: { id: req.params.id }
    })
      .then((data) => {
        res.json(data);
      });
  });

};