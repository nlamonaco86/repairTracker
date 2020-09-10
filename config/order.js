// Dependencies
const connection = require("../config/connection.js");
const util = require('util');
// promisify the query because shennanigans
const promQuery = util.promisify(connection.query).bind(connection);

// This will run specific C-R-U-D functions in the database
const order = {
  all: function (cb) {
    promQuery("SELECT * FROM orders", function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  create: function (vals, cb) {
      promQuery("INSERT INTO orders (firstName, lastName, tel, email, issue, orderNum) VALUES (?,?,?,?,?,?)", vals, function (err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
  },
  findOne: function (val, cb) {
    promQuery("SELECT * FROM orders WHERE orderNum = ?", val, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // Redundancy detected - optimize and combine
  update: function (condition, cb) {
    promQuery("SELECT * FROM orders WHERE orderNum = ?", val, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateInProgress: function (condition, cb) {
    promQuery("UPDATE orders SET complete = 0, inProgress = 1, waiting = 0, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateWaiting: function (condition, cb) {
    promQuery("UPDATE orders SET complete = 0, inProgress = 0, waiting = 1, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  delete: function (condition, cb) {
    promQuery("DELETE FROM orders WHERE id = ?", id, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};
// Export the database functions for the controller.
module.exports = order;
