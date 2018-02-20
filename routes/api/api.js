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
	};

	User.findOne({ 'username': username }, (err, userMatch) => {

		/*If there is a userame already in the database return message*/
		if (userMatch) {
			console.log("Already a user")
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})

		} else {

			/*Accessing User database*/
			const newUser = new User();
			newUser.email = email,
			newUser.username = username,
			newUser.password = newUser.hashPassword(password);

			/*Save new user*/
			newUser.save((err, savedUser) => {
				if (err) return err;
				// return res.json(savedUser)
				console.log("user saved");
			})
		}
	})
});

/*Route for login*/
router.post('/login', (req, res, next) => {
	console.log('================')
	next()
	},
	passport.authenticate('local'), (req, res) => {
		console.log('POST to /login')
		// const user = JSON.parse(JSON.stringify(req.user)) // hack
		// const cleanUser = Object.assign({}, user)
		// if (cleanUser.local) {
		// 	console.log(`Deleting ${cleanUser.local.password}`)
		// 	delete cleanUser.local.password
		// }
		// res.json({ user: cleanUser })
		console.log(res.locals.user);
	}
);

// ensureAuthenticated = (req, res, next) => {
//     if(req.isAuthenticated()) {
//         return next();
//     } else {
//         // res.redirect('signin');
//     };
// };

/*Route to logout user*/
router.route('/logout').post((req, res) => {
	req.logout();
	res.redirect('/api/');
})

module.exports = router;
