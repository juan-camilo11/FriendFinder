// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const htmlRoutes = require("./app/routing/htmlRouting");
const surveyRoutes = require("./app/routing/apiRouting");

// Sets up the Express App
// =============================================================
let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



htmlRoutes.homeRoute;
htmlRoutes.surveyRoute;
surveyRoutes.apiRead;
surveyRoutes.apiWrite;

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});