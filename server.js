const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./models/users.js') // loads our connection to the mongo database
const passport = require('./passport.js')
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('supersecret'));

const cookieExpirationDate = new Date();
const cookieExpirationDays = 1;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);

app.use(
	session({
		secret: 'supersecret',
		store: new MongoStore({ mongooseConnection: dbConnection, ttl: 0 * 6 * 60 * 60}),
		resave: true,
		saveUninitialized: true,
		cookie: {
	    httpOnly: true,
	    expires: cookieExpirationDate
		}
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

app.use(express.static("client/build"));
app.use("/", routes);

// Set up promises with mongoose
mongoose.Promise = Promise;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', MONGODB_URI);
  }
});

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
 	console.log("Mongoose connection successful.");
});

// Start the API server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
