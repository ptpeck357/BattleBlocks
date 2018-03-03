const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const dbConnection = require('./models/users.js') // loads our connection to the mongo database
const passport = require("./passport/index.js");
const routes = require("./routes/index.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/battleblocks";
mongoose.Promise = Promise;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	session({
		secret: 'Secret',
		store: new MongoStore({ uri: MONGODB_URI,collection:"sessions" }),
		resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600000
        }
	})
);

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

/* Express Validator */
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

app.use(routes);

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, (err, db) => {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
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

// Start the API server
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
