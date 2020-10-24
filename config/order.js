// Dependencies
const connection = require("../config/connection.js");
const util = require('util');
// promisify the query because shennanigans
const promQuery = util.promisify(connection.query).bind(connection);

// This will run specific C-R-U-D functions in the database
const order = {
  all: function (cb) {
    promQuery("SELECT * FROM Orders", function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  create: function (vals, cb) {
      promQuery("INSERT INTO Orders (firstName, lastName, tel, email, year, make, model, issue, orderNum, photo) VALUES (?,?,?,?,?,?,?,?,?,?)", vals, function (err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
  },
  findOne: function (val, cb) {
    promQuery("SELECT * FROM Orders WHERE orderNum = ?", val, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateIssue: function (id, issue, cb) {

    let queryString = "UPDATE Orders SET issue = " 
    queryString += "'"
    queryString += issue
    queryString += "'"
    queryString += " WHERE id = "
    queryString += id
    promQuery(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
   // redundant, optimize and combine
  updateInProgress: function (condition, cb) {
    promQuery("UPDATE Orders SET complete = 0, inProgress = 1, waiting = 0, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateWaiting: function (condition, cb) {
    promQuery("UPDATE Orders SET complete = 0, inProgress = 0, waiting = 1, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  updateComplete: function (condition, cb) {
    promQuery("UPDATE Orders SET complete = 1, inProgress = 0, waiting = 0, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  delete: function (id, cb) {
    promQuery("DELETE FROM Orders WHERE id = ?", id, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};
// Export the database functions for the controller.
module.exports = order;
