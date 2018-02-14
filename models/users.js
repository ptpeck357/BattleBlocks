var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create the User schema
var User = new Schema({

	username: {
		type: String,
    trim: true,
    unique: false,
    required: true
	},

  password: {
    type: String,
    trim: true,
    unique: false,
    required: true
  },

  wins: {
    type: Number
  },

  losses: {
    type: Number
  },

  totalScore: {
    type: Number
  },

  totalGames: {
    type: Number
  },

  joindate: {
     type: Date,
     default: Date.now
  }

});

// Create the Leaderboard model with the NoteSchema
// var Leaderboard = mongoose.model("Leaderboard", User);

module.exports = User;
