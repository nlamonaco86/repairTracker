const express = require("express");
const router = express.Router();

// Import the model to use it
const burger = require("../models/burger.js");

//CREATE
router.post("/api/burgers", function (req, res) {
  var vals = Object.entries(req.body).map(e => e[1]); // get values
  
  burger.create(vals, function(results) {
    console.log(results);
    res.json({id: results.insertId});
  });
});
//READ
router.get("/", (req, res) =>{
  burger.all((data) => {
    let hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});
//UPDATE
router.put("/api/burgers/:id", (req, res) => {
  burger.update(req.params.id, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
//DELETE
router.delete("/api/burgers/:id", (req, res) => {
  burger.delete(req.params.id, (result) => {
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
