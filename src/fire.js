import Rebase from "re-base";
import firebase from "firebase";

  //Configure Firebase
  var app = firebase.initializeApp({
    apiKey: "AIzaSyBA-nVARKcALkHfR7D7GsBqzU5qmCHY_WA",
    authDomain: "battleblocks-e6136.firebaseapp.com",
    databaseURL: "https://battleblocks-e6136.firebaseio.com",
    projectId: "battleblocks-e6136",
    storageBucket: "",
    messagingSenderId: "948984956115"
  });

  //Initialize Firebase
  var base = Rebase.createClass(app.database());

export default base;