const router = require("express").Router();
const passport = require('../../passport');
const User = require('../../models/users.js');

router.get("/", (req, res) => {
	if(req.user){
		res.json({message: "User found", isAuthenticated: true, user: req.user.username});
		console.log(req.user);
	} else {
		res.json(
			{message: "No user found",  isAuthenticated: false, user: null}
		);
	}
});

router.post('/signup', (req, res) => {

	/*Getting user's inputs from form*/
	const email = req.body.email;
	const username= req.body.username;
	const password= req.body.password;
	const confirmPassword= req.body.confirmPassword;

	/*Checking forms for validity*/
	req.checkBody('email', 'Please provide a valid email address').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Passwords must be at least 6 characters long').isLength({ min: 6 })
	req.checkBody('confirmPassword', 'Password does not match').equals(password);

	var errors = req.validationErrors();

	if(errors){
		return res.json({errors: errors})
	} else {

		User.findOne({ 'username': username }, (err, userMatch) => {

			/*If there is a userame already in the database return message*/
			if (userMatch) {
				console.log("Username taken")
				return res.json({
					errors: [{msg: `Sorry, already a user with the username: ${username}`}]
				})

			} else {

				/*Adding new user*/
				const newUser = new User();
				newUser.email = email,
				newUser.username = username,
				newUser.password = newUser.hashPassword(password);
				newUser.wins = 0;
				newUser.losses = 0;
				newUser.totalScore = 0;
				newUser.totalGame = 0;

				/*Save new user*/
				newUser.save().then((dbUser) => {
					res.json(dbUser);
					console.log("User saved")
				  })
			}
		});
	};
});

router.post('/login', (req, res, next) =>{
	passport.authenticate('local', function(err, user, info) {
	  	if (err) { return res.status(400).send(err);}
	  	if (!user) {
			return res.json(
				{message: 'Incorrect username or password', path: "/", user: null}
			);
		};
	  	req.login(user, (err) => {
			if (err) { return res.status(400).send(err); }
			return res.json(
				{message: 'You are now logged in!',  path: "/lobby", user: user.username}
			);
	  	});
	})(req, res, next);
});

router.get('/lobby', (req, res) => {
	if(req.user){
		res.json(req.user);
		// console.log(req.user);
	} else {
		res.json(
			{message: "No user found",  path: "/lobby", user: null}
		);
	}
});

router.get('/logout', (req, res) => {
	if(req.user){
		req.session.destroy();
		res.clearCookie('connect.sid');
		req.json({message: "You are logged out", path: "/"})
	} else {
		console.log("Already signed out");
	}
});

module.exports = router;
