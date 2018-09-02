// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const htmlRoutes = require("./app/routing/htmlRouting.js");
const apiRoutes = require("./app/routing/apiRouting.js");

// Sets up the Express App
// =============================================================
let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//home page route and callback
app.use(htmlRoutes.homePath);

//survey page route and callback
app.use(htmlRoutes.surveyPath);

app.use(apiRoutes.apiRead);

app.use(apiRoutes.apiWrite);


// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
