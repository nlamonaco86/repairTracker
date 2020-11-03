// Dependencies
const connection = require("../config/connection.js");
const util = require('util');
// promisify the query because shennanigans
const promQuery = util.promisify(connection.query).bind(connection);

// This will run specific C-R-U-D functions in the database
const order = {
  all: function (cb) {
    //Performs a LEFT OUTER JOIN of Customers and Orders, based on matching OrderId
    promQuery("SELECT `Order`.`id`, `Order`.`year`, `Order`.`make`, `Order`.`model`, `Order`.`vin`, `Order`.`color`, `Order`.`issue`, `Order`.`photo`, `Order`.`received`, `Order`.`waiting`, `Order`.`inProgress`, `Order`.`complete`, `Order`.`paid`, `Order`.`createdAt`, `Order`.`updatedAt`, `Order`.`id` AS `id`, `Customer`.`firstName` AS `firstName`, `Customer`.`lastName` AS `lastName`, `Customer`.`tel` AS `tel`, `Customer`.`email` AS `email`, `Customer`.`addr1` AS `addr1`, `Customer`.`addr2` AS `addr2`, `Customer`.`city` AS `city`, `Customer`.`state` AS `state`, `Customer`.`zip` AS `zip` FROM `Orders` AS `Order` LEFT OUTER JOIN `Customers` AS `Customer` ON `Order`.`id` = `Customer`.`OrderId`", function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  one: function (cb) {
    //Performs a LEFT OUTER JOIN of Customers and Orders, based on matching OrderId
    promQuery("SELECT `Order`.`id`, `Order`.`year`, `Order`.`make`, `Order`.`model`, `Order`.`vin`, `Order`.`color`, `Order`.`issue`, `Order`.`photo`, `Order`.`received`, `Order`.`waiting`, `Order`.`inProgress`, `Order`.`complete`, `Order`.`paid`, `Order`.`createdAt`, `Order`.`updatedAt`, `Customer`.`id` AS `CustomerId`, `Customer`.`firstName` AS `firstName`, `Customer`.`lastName` AS `lastName`, `Customer`.`tel` AS `tel`, `Customer`.`email` AS `email`, `Customer`.`addr1` AS `addr1`, `Customer`.`addr2` AS `addr2`, `Customer`.`city` AS `city`, `Customer`.`state` AS `state`, `Customer`.`zip` AS `zip` FROM `Orders` AS `Order` LEFT OUTER JOIN `Customers` AS `Customer` ON `Order`.`id` = `Customer`.`OrderId` WHERE `Order`.`id` = '62948765'", function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // create: function (vals, cb) {
  //     promQuery("INSERT INTO Orders (firstName, lastName, tel, email, year, make, model, issue, orderNum, photo) VALUES (?,?,?,?,?,?,?,?,?,?)", vals, function (err, result) {
  //       if (err) {
  //         throw err;
  //       }
  //       cb(result);
  //     });
  // },
  // findOne: function (val, cb) {
  //   promQuery("SELECT * FROM Orders WHERE orderNum = ?", val, function (err, result) {
  //     if (err) throw err;
  //     cb(result);
  //   });
  // },
  // updateIssue: function (id, issue, cb) {

  //   let queryString = "UPDATE Orders SET issue = " 
  //   queryString += "'"
  //   queryString += issue
  //   queryString += "'"
  //   queryString += " WHERE id = "
  //   queryString += id
  //   promQuery(queryString, function (err, result) {
  //     if (err) throw err;
  //     cb(result);
  //   });
  // },
  //  // redundant, optimize and combine
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
  updatePaid: function (condition, cb) {
    promQuery("UPDATE Orders SET paid = 1, complete = 0, inProgress = 0, waiting = 0, received = 0 WHERE id = ?", condition, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
  // delete: function (id, cb) {
  //   promQuery("DELETE FROM Orders WHERE id = ?", id, function (err, result) {
  //     if (err) throw err;
  //     cb(result);
  //   });
  // }
};
// Export the database functions for the controller.
module.exports = order;
