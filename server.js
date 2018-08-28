// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
let friendsArray = require("./app/data/friends.js");
const htmlRoutes = require("./app/routing/htmlRouting.js");
const apiRoutes = require("./app/routing/apiRouting.js");

// Sets up the Express App
// =============================================================
let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(htmlRoutes.publicPaths.home, function(req, res) {
  res.sendFile(path.join(__dirname, htmlRoutes.localPaths.home));
});

app.get(htmlRoutes.publicPaths.survey, (req, res) => {
  res.sendFile(path.join(__dirname, htmlRoutes.localPaths.survey));
});

app.get(apiRoutes.apiPaths.route, function(req, res) {
  return res.json(friendsArray);
});

app.post(apiRoutes.apiPaths.route, (req, res) => {
  let newFriend = req.body;
  friendsArray.push(newFriend);
  res.json(newFriend);
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
