import firebase from "firebase";

  //Configure Firebase
  var config = {
    apiKey: "AIzaSyBA-nVARKcALkHfR7D7GsBqzU5qmCHY_WA",
    authDomain: "battleblocks-e6136.firebaseapp.com",
    databaseURL: "https://battleblocks-e6136.firebaseio.com",
    projectId: "battleblocks-e6136",
    storageBucket: "",
    messagingSenderId: "948984956115"
  };

  //Initialize Firebase
  var fire = firebase.initializeApp(config);
  var database = firebase.database();

export default database;