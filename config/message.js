// Dependencies
const connection = require("../config/connection.js");
const util = require('util');
// promisify the query because shennanigans
const promQuery = util.promisify(connection.query).bind(connection);

// This will run specific C-R-U-D functions in the database
const message = {
  all: function (cb) {
    //Get all messages
    promQuery("SELECT id, senderID, receiverID, senderEmail, receiverEmail, senderName, subject, body, unread, seen, inView, SUBSTRING(createdAt, 1, 16) AS createdAt FROM Messages", function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  one: function (val, cb) {
    promQuery("SELECT id, senderID, receiverID, senderEmail, receiverEmail, senderName, subject, body, unread, seen, inView, SUBSTRING(createdAt, 1, 16) AS createdAt FROM Messages WHERE id = ?", val, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  byReceiver: function (val, cb) {
    promQuery("SELECT id, senderID, receiverID, senderEmail, receiverEmail, senderName, subject, body, unread, seen, inView, SUBSTRING(createdAt, 1, 16) AS createdAt FROM Messages WHERE receiverID = ?", val, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  inView: function (val, cb) {
    promQuery("UPDATE Messages SET inView = IF(id = ?, 1, 0)", val, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  markRead: function (val, cb) {
    promQuery("UPDATE Messages SET unread = 0, seen = 1, WHERE id = ?", val, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  markUnread: function (val, cb) {
    promQuery("UPDATE Messages SET unread = 1, seen = 0, WHERE id = ?", val, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
};
// Export the database functions for the controller.
module.exports = message;
