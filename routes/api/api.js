const router = require("express").Router();
const passport = require('../../passport');
const User = require('../../models/users.js');

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

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	  	if (err) {
			return next(err);
		}
	 	if (!user) {
		 	console.log("invalid User")
		}
		if (user) {
			res.json(user)
		}
	})
	(req, res, next);
  });

router.get('/leaderboard', function(req, res, next) {
	
	User.find().then((dbUsers) => {

		// res.json(dbUsers);
		// console.log("Users Found");
		var result = [];
      
		for(var i=0; i<dbUsers.length; i++){

			let resultsObj = {};

			resultsObj.joindate = dbUsers[i].joindate;
      		resultsObj.username = dbUsers[i].username;
      		resultsObj.wins = dbUsers[i].wins;
      		resultsObj.losses = dbUsers[i].losses;
      		resultsObj.totalScore = dbUsers[i].totalScore;

      		result.push(resultsObj);
      		console.log(result);

		}
	res.json(result);
	console.log(result);

  })
	
});

module.exports = router;
