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
	req.checkBody('email', 'Email is required').isEmail();
	req.checkBody('username', 'username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('confirmPassword', 'Password does not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		return res.json(errors)
	} else {

		User.findOne({ 'username': username }, (err, userMatch) => {

			/*If there is a userame already in the database return message*/
			if (userMatch) {
				console.log("Already a user")
				return res.json({
					error: `Sorry, already a user with the username: ${username}`
				})

			} else {

				/*Adding new user*/
				const newUser = new User();
				newUser.email = email,
				newUser.username = username,
				newUser.password = newUser.hashPassword(password);

				/*Save new user*/
				newUser.save((err, savedUser) => {
					if (err) throw err;
					res.json(savedUser)
					console.log("user saved");
				})
			}
		});
	};
});

/*Route for login*/
router.post('/login', passport.authenticate('local'), function(req, res) {
		const currentUser = req.user;
		console.log("valid")
		console.log(currentUser.username)
		res.status(200).json(req.user);
  	}
);

/*Route to lobby*/
// router.get('/lobby', isLoggedIn, (req, res) => {3
// 	console.log("lobby")
// })

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	} else {
// 		return;
// 	}
// }

/*Route to logout user*/
// router.post('/logout', (req, res) => {
// 	req.logout();
// 	req.destroy()
// 	console.log("user logged out")
// })

module.exports = router;
