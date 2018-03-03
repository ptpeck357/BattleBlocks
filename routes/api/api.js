const router = require("express").Router();
const passport = require('../../passport');
const User = require('../../models/users.js');
var multer  = require('multer');
const uploadPicture = multer({
	dest: '../../public/profilePicture'
});
const fs = require("fs");

/*Route to see ff the user is arleady signed in, go to lobby*/
router.get("/", (req, res) => {
	if(req.user){
		res.json({message: "Already signed in", isAuthenticated: true, path: "/lobby"});
		console.log(req.user);
	} else {
		res.json(
			{message: "No user found",  isAuthenticated: false, user: null}
		);
	}
});

/*Route to add new users in MongoDB*/
router.post('/signup', uploadPicture.any(), (req, res) => {

	/*Getting user's inputs from form*/
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;


	/* Requesting Files for profile picture*/

	if(req.files){
		console.log(req.files[0]);
		console.log(req.files);
		switch (req.files[0].mimetype) {
               case 'image/jpeg':
                   fileExtension = '.jpeg';
                   break;
               case 'image/jpg':
                   fileExtension = '.jpg';
                   break;
               case 'image/png':
                   fileExtension = '.png';
                   break;
               case 'image/gif':
                   fileExtension = '.gif';
                   break;
           }
           fs.renameSync(req.files[0].path, req.files[0].destination + "/" + req.files[0].filename + fileExtension, function (err) {
               if (err) throw err;
           });
	}


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
				newUser.profilePicture = req.files[0].filename + fileExtension;

				/*Save new user*/
				newUser.save().then((dbUser) => {
					res.json(dbUser);
					console.log("User saved")
				  })
			}
		});
	};
});

/*Route that logs user and authenticates them through passport */
router.post('/login', (req, res, next) =>{
	passport.authenticate('local', function(err, user, info) {
	  	if (err) { return res.status(400).send(err);}
	  	if (!user) {
			return res.json(
				{message: 'Incorrect username or password', path: "/", user: null}
			);

		}req.login(user, (err) => {
			if (err) { return res.status(400).send(err); }
			return res.json(
				{message: 'You are now logged in!',  path: "/lobby", user: user.username}
			);
	  	});
	})(req, res, next);
});

/*Gets user from session and sends to lobby route in front end*/
router.get('/lobby', (req, res) => {
	if(req.user){
		res.json(req.user);
	} else {
		res.json(
			{message: "No user found",  path: "/lobby", user: null}
		);
	}
});

/*If winner on leftboard, update MongoDB databse*/
router.post('/leftboard', (req, res) => {

	const {username, opponent, points} = req.body;

	User.findOneAndUpdate({username: username}, {$inc:{totalscore:points, wins:1}}, {new: true}, function(err, doc){
		if(err) throw err;
		console.log("Winner updated")
	});

	/*Updates looser data*/
	User.findOneAndUpdate({username: opponent}, {$inc:{totalscore:points, losses:1}}, {new: true}, function(err, doc){
		if(err) throw err;
		console.log("Looser updated")
	});

});

/*If winner on rightboard, update MongoDB databse*/
router.post('/rightboard', (req, res) => {

	const {username, opponent, points} = req.body;

	User.findOneAndUpdate({username: username}, {$inc: { totalscore: points, wins: 1}}, {new: true}, function(){
		if(err) throw err;
		console.log("Winner updated")
	});

	/*Updates looser data*/
	User.findOneAndUpdate({username: opponent}, {$inc:{totalscore:points, losses:1}}, {new: true}, function(err, doc){
		if(err) throw err;
		console.log("Looser updated")
	});

});

/*Route to log user out of session*/
router.get('/logout', (req, res) => {
	if(req.user){
		req.session.destroy();
		res.clearCookie('connect.sid');
		req.json({message: "You are logged out", isAuthenticated: false, path: "/"})
	} else {
		console.log("Already signed out");
	}
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
      		resultsObj.profilePicture = dbUsers[i].profilePicture;

      		result.push(resultsObj);
      		console.log(result);
		}
	res.json(result);
	console.log(result);

  })
	
});

module.exports = router;
