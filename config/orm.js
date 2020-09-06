// Dependencies
const connection = require("../config/connection.js");
const util = require('util');

// promisify the query because shennanigans
const promQuery = util.promisify(connection.query).bind(connection);

// Object for all 4 SQL statement functions CRUD.
let orm = {
  //INSERT INTO ?? (COLUMN NAMES) VALUES (ROW DATA)
  create: function(vals, cb) {
    promQuery("INSERT INTO orders (firstName, lastName, tel, issue) VALUES (?,?,?,?)", vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  all: (cb) => {
    promQuery("SELECT * FROM orders", function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // PARAMETIZE THESE 3 LATER INTO 1 NICE DYNAMIC FUNCTION
  // UPDATE ?? SET ?? = ?
  update: (condition, cb) => {
    promQuery("UPDATE orders SET complete = 1, inProgress = 0, waiting = 0, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateInProgress: (condition, cb) => {
    promQuery("UPDATE orders SET complete = 0, inProgress = 1, waiting = 0, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateWaiting: (condition, cb) => {
    promQuery("UPDATE orders SET complete = 0, inProgress = 0, waiting = 1, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // DELETE FROM ?? WHERE ?? = ?
  delete: (id, cb) => {
    promQuery("DELETE FROM orders WHERE id = ?", id, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

// Export the orm object for the model (order.js).
module.exports = orm;
