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
  let matchArray = [];
  let sum = 0;
  let newSum = 0;
  let responseArray = [];
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
        matchArray.push(match);
      } else {
        for (i = 0; i < x.scores.length; i++) {
          let diff = Math.abs(
            parseInt(x.scores[i]) - parseInt(newFriend.scores[i])
          );
          newSum = newSum + diff;
        }

        //this set of if statements serve to identify who the match would be
        //if newSum is qual to sum, this means that there are multiple people the new user can match with
        //we want to display this to the user, so we push all indicies of friends that would match
        //into the array Match array
        //If we encounter a newSum that is lower than the previous lowest sum, we set newSum equal to sum
        //wipe the matchArray array of all previous indicies and fill it with the latest index to match the new user
        if (newSum === sum) {
          matchArray.push(index);
        } else if (newSum < sum) {
          sum = newSum;
          match = index;
          matchArray = [match];
        }
        newSum = 0;
      }
    });

    //add the latest profile to the data set
    friends.push(newFriend);

    //if there is only one element in the match array, we respond to the client request with the name
    //of the person they matched with
    //else if there is more than one element in the array, we want to return the list of people that they matched with
    //best way to return would probably be an array with the name and picture of the person they matched with
    if (matchArray.length < 2) {
      let tempObj = {
        name: friends[match].name,
        picture: friends[match].photo
      };
      responseArray.push(tempObj);
      return res.json(responseArray);
    } else {
      matchArray.map(x => {
        let tempObj = {
          name: friends[x].name,
          picture: friends[x].photo
        };
        responseArray.push(tempObj);
      });
      return res.json(responseArray);
    }
  }
});

module.exports = {
  apiRead: readApi,
  apiWrite: writeApi
};
