// Basic route that sends the user first to the AJAX Page
const homeRoute = app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

const surveyRoute = app.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "survey.html"));
});

module.exports = {
  homeRoute: homeRoute,
  surveyRoute: surveyRoute
};
