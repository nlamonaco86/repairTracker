// Dependencies
const connection = require("../config/connection.js");
const util = require('util');

// promisify the query because shennanigans
const promQuery = util.promisify(connection.query).bind(connection);

// Object for all 4 SQL statement functions CRUD.
let orm = {
  create: function(vals, cb) {
    promQuery("INSERT INTO burgers (firstName, lastName, tel, issue, devoured, waiting, inProgress) VALUES (?,?,?,?,?,?,?)", vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  all: (cb) => {
    promQuery("SELECT * FROM burgers", function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // "UPDATE ?? SET ?? = ? WHERE ?? = ?"
  update: (condition, cb) => {
    promQuery("UPDATE burgers SET devoured = 1 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // DELETE FROM ?? WHERE ?? = ?
  delete: (id, cb) => {
    promQuery("DELETE FROM burgers WHERE id = ?", id, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
