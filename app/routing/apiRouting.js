// Basic route that sends the user first to the AJAX Page

let friendsArray = require("../data/friends");
const express = require("express");
const bodyParser = require("body-parser");


let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRead = app.get("/api/friends", function(req, res) {
  return res.json(friendsArray.friendsArray);
});

const apiWrite = app.post("/api/friends", (req, res) => {
  let newFriend = req.body;
  friendsArray.friendsArray.push(newFriend);
  res.end();
});

module.exports = {
  apiRead: apiRead,
  apiWrite: apiWrite
};
