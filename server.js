const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const dbConnection = require('./models/users.js') // loads our connection to the mongo database
const passport = require("./passport/index.js");
const routes = require("./routes/index.js");
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/battleblocks";
mongoose.Promise = Promise;

//Parse application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Server instance
const server = http.createServer(app);

// -------------------------- Sessions -----------------------------

//Initiate sessions
app.use(
	session({
		secret: 'Secret',
		store: new MongoStore({ uri: MONGODB_URI,collection:"sessions" }),
		resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 18000000
        }
	})
);

//Initialize passport
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser


// -------------------------- ?What is this stuff? -----------------------------

// Loading evnironmental variables here
// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config()
// }
// require('dotenv').config()


//This validates and sanitizes strings
app.use(expressValidator({
	errorFormatter: (param, msg, value) => {
		const namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;

		while(namespace.length) {
				formParam += '[' + namespace.shift() + ']';
		}
		return {
				param : formParam,
				msg   : msg,
				value : value
		};
	}
}));

// // Checks if it's production environment and sends build folder
// if (process.env.NODE_ENV === 'production') {
// 	app.use('/', express.static(path.join(__dirname, 'build/static')))
// 	app.get('/', (req, res) => {
// 		res.sendFile(path.join(__dirname, 'build/'))
// 	})
// }

// -------------------------- Routes -----------------------------

//Sets static assets path
app.use(express.static(path.join(__dirname, 'build/static/')));

//Sets route to index
app.use("/", (req, res) => {
    res.sendFile(__dirname, '/index.html')
})

//Setting up routes in app
app.use(routes);

// -------------------------- MongoDB -----------------------------

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, (err, db) => {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
        useMongoClient: true,
		console.log('Connection established to', MONGODB_URI);
	}
});

const db = mongoose.connection;

// Show any mongoose errors
db.on("error", (error) => {
	console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", () => {
 	console.log("Mongoose connection successful.");
});

// -------------------------- Listen -----------------------------

// Start the API server
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
