const path = require("path");
const router = require("express").Router();
const User = require('../models/users')

// If no API routes are hit, send the React app

router.post('/signup', (req, res) => {
	const { username, password } = req.body
console.log(req.body)
	// User.findOne({ 'local.username': username }, (err, userMatch) => {
	// 	if (userMatch) {
	// 		return console.log("already a user")
	// 	}
	// 	const newUser = new User({
	// 		'username': username,
	// 		'password': password
	// 	})
	// 	newUser.save((err, savedUser) => {
	// 		console.log("New User");
	// 		if (err) return res.json(err)
	// 	})
	// })


}
module.exports = router;
