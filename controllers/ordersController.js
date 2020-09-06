const express = require("express");
const router = express.Router();

// Import the model to use it
const order = require("../models/order.js");

//CREATE
router.post("/api/orders", function (req, res) {
  var vals = Object.entries(req.body).map(e => e[1]); // get values
  
  order.create(vals, function(results) {
    console.log(results);
    res.json({id: results.insertId});
  });
});
//READ
router.get("/", (req, res) =>{
  order.all((data) => {
    let hbsObject = {
      orders: data
    };
    res.render("index", hbsObject);
  });
});
//UPDATE
router.put("/api/orders/complete/:id", (req, res) => {
  order.update(req.params.id, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
router.put("/api/orders/inProgress/:id", (req, res) => {
  order.updateInProgress(req.params.id, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
router.put("/api/orders/waiting/:id", (req, res) => {
  order.updateWaiting(req.params.id, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
//DELETE
router.delete("/api/orders/:id", (req, res) => {
  order.delete(req.params.id, (result) => {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
