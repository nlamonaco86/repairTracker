  // Require models and passport
require('dotenv').config();
const db = require("../models");
const message = require("../config/message.js");

module.exports = function (app) {
  // VIEW MESSAGE
  app.put("/api/messages/inView/:id", (req, res) => {
      console.log(req.params)
   message.inView(req.params.id, (result) => {
      (result.changedRows == 0 ? res.json({ error: "No Results Found! Please try again" }) : res.json({ message: "Success!" }) )
    });
  })

  app.put("/api/messages/markRead/:id", (req, res) => {
    console.log(req.params)
 message.markRead(req.params.id, (result) => {
    (result.changedRows == 0 ? res.json({ error: "No Results Found! Please try again" }) : res.json({ message: "Success!" }) )
  });
})

app.put("/api/messages/markUnread/:id", (req, res) => {
    console.log(req.params)
 message.markUnread(req.params.id, (result) => {
    (result.changedRows == 0 ? res.json({ error: "No Results Found! Please try again" }) : res.json({ message: "Success!" }) )
  });
})

};