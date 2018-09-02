const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const friendsArray = require("../data/friends.js");

let app = express();

//setting varible friends to represent the array of friends located in friends.js
let friends = friendsArray.array;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let readApi = app.get("/api/friends", (req, res) => {
  return res.json(friends);
});

let writeApi = app.post("/api/friends", (req, res) => {

  //this sets new Friend equal to the JSON object passed from the client
  let newFriend = req.body;
  //match will be the index of the person in the friends array the newly added person matches with
  let match = "";
  let sum = 0;
  let newSum = 0;
  //if the friends array is empty, we respond with a false
  //this lets the front end know that the array is empty and there is no one
  //the first user can match with
  if (friends.length == 0) {
    friends.push(newFriend);
    res.send(false);
  } else {
    //map will go through each element in the friend array
    //in the map callback we iterate through the scores array and compare each value to the newest array that was added
    //the total difference is stored in sum
    //need a way to
    friends.map((x, index) => {
      if (index === 0) {
        for (i = 0; i < x.scores.length; i++) {
          let diff = Math.abs(
            parseInt(x.scores[i]) - parseInt(newFriend.scores[i])
          );
          sum = sum + diff;
        }
        //initialized match, if all other sums in the array are greater than the first person's
        //the match will be the first person in the array
        match = index;
      } else {
        for (i = 0; i < x.scores.length; i++) {
          let diff = Math.abs(
            parseInt(x.scores[i]) - parseInt(newFriend.scores[i])
          );
          newSum = newSum + diff;
        }
        //this compared the latest sum to the lowest sum prior
        //if the new sum is lower than the new sum, sum (lowest) is replaced
        //this also updates who the match is
        if (newSum < sum) {
          sum = newSum;
          match = index;
        }
        newSum = 0;
      }
    });
    friends.push(newFriend);
    //the response sent back is the name of the person the user matched with
    res.send(friends[match].name);
  }
});

module.exports = {
  apiRead: readApi,
  apiWrite: writeApi
};
