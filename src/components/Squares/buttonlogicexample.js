import React from "react";
import firebase from "firebase";

const Squares = () => {

  //Global variables
  var leftside = [];
  var rightside = [];
  var coordinates = leftside + rightside;
  let buttonArray = [];

  //Configure Firebase
  var config = {
    apiKey: "AIzaSyBA-nVARKcALkHfR7D7GsBqzU5qmCHY_WA",
    authDomain: "battleblocks-e6136.firebaseapp.com",
    databaseURL: "https://battleblocks-e6136.firebaseio.com",
    projectId: "battleblocks-e6136",
    storageBucket: "",
    messagingSenderId: "948984956115"
  };

  //Set new coordinates
  let newCoordinates = function() {

  //This creates the coordinates of the gameboard
    
    //Coordinates for the left side
    var horizontal = [1, 2, 3, 4, 5, 6, 7, 8];
    var vertical = ["A", "B", "C", "D", "E", "F", "G", "H"];

    for (var i=0; i<horizontal.length; i++) {
      for (var j=0; j<vertical.length; j++) {
        leftside.push(vertical[j]+horizontal[i])
      }
    }
    return leftside;

    //Coordinates for the right side
    horizontal = [9, 10, 11, 12, 13, 14, 15, 16];

    for (var i=0; i<horizontal.length; i++) {
      for (var j=0; j<vertical.length; j++) {
        rightside.push(vertical[j]+horizontal[i])
      }
    }
    return rightside;  
  }

  //Constructor for making new buttons
  function Buttons(id, coordinates, status, side) {
    this.id = id;
    this.coordinates = coordinates;
    this.status = status;
    this.side = side;
  }

  //Initialize Firebase
  firebase.initializeApp(config);

  //Create database
  var database = firebase.database();

  //When page loads...
  $(document).on("load", function(){

    newCoordinates();

    //Create button array
    var addButton = [];

    //Loop through coordinates
    for (i=0; i<coordinates.length; i++) {
      
      //Create buttons
      addButton[i] =  [
      new Buttons(
        i, // id will be 1 - 64
        coordinates[i], // coordinates will be grabbed from coordinates array
        true,  // all buttons will be active to start
        if(i < 32) { // first half of the buttons will be left ('0'), second half will be right ('1')
          0
        } else 1
      ];

    //Push buttons to Firebase
    database.ref().push(addButton[i]) 
    }
  })

  // console.log(leftside);
  console.log(rightside);
}

export default Squares