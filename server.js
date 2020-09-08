// Dependencies
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

// Serve static content for the app from the "public" directory
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
const apiroutes = require("./controllers/api-routes.js");
const htmlroutes = require("./controllers/html-routes.js");

//Use the given routes
app.use(apiroutes);
app.use(htmlroutes);

// Start the server so it can listening to client requests.
app.listen(PORT, function() {
  console.log("🌎 Now working at: http://localhost:" + PORT);
});
