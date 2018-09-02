const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let homePath = app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/home.html"));
});

let surveyPath = app.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

module.exports = {
  homePath: homePath,
  surveyPath: surveyPath
};
