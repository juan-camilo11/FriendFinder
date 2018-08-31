// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const friends = require("./app/data/friends");
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

//routes are fine, need to figure out what is going on with the array
app.get(apiRoutes.apiPaths.route, function(req, res) {
  return res.json(friends.array);
});

//routes are fine
//logic to compare most recent add to others in the array will go here
app.post(apiRoutes.apiPaths.route, (req, res) => {
  let newFriend = req.body;
  //match will be the person the newly added array matches with
  let match = "";
  let sum = 0;
  let newSum = 0;
  //if the friends array is empty, we respond with a false
  //this lets the front end know that the array is empty and there is no one
  //the first user can match with
  if (friends.array.length == 0) {
    friends.array.push(newFriend);
    res.send(false);
  } else {
    //map will go through each element in the friend array
    //in the map callback we iterate through the scores array and compare each value to the newest array that was added
    //the total difference is stored in sum
    //need a way to
    friends.array.map((x, index) => {
      if (index === 0) {
        for (i = 0; i < x.scores.length; i++) {
          let diff = Math.abs(parseInt(x.scores[i]) - parseInt(newFriend.scores[i]));
          sum = sum + diff;
        }
      } else {
        for (i = 0; i < x.scores.length; i++) {
          let diff = Math.abs(parseInt(x.scores[i]) - parseInt(newFriend.scores[i]));
          newSum = newsum + diff;
        }
        //this compared the latest sum to the lowest sum prior
        //if the new sum is lower than the new sum, sum (lowest) is replaced
        //this also updates who the match is
        if(newSum < sum){
          sum = newSum;
          match = index;
        }
        newSum = 0;
      }
    });
    friends.array.push(newFriend);
    //the response sent back is the name of the person the user matched with
    res.send(friends.array[match].name);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
