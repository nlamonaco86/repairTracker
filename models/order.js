// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");
//"CRUD Burger" doesn't sound yummy...
const order = {
  all: function(cb) {
    orm.all(function(res) {
      cb(res);
    });
  },
  create: function(vals, cb){
    orm.create(vals, function(res) {
      cb(res);
    });
  },
  update: function(condition, cb) {
    orm.update(condition, function(res) {
      cb(res);
    });
  },
  updateInProgress: function(condition, cb) {
    orm.updateInProgress(condition, function(res) {
      cb(res);
    });
  },
  updateWaiting: function(condition, cb) {
    orm.updateWaiting(condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete(condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgersController.js).
module.exports = order;
