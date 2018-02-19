const router = require("express").Router();
const User = require('../../models/users.js');

router.route('/signup')
.post(function(req, res){
  console.log(req.body)
	const { email, username, password } = req.body

		// User.findOne({ 'username': username }, (err, userMatch) => {
			// if (userMatch) {
			// 	return res.json({
			// 		error: `Sorry, already a user with the username: ${username}`
			// 	})
			// }
			const newUser = new User({
        'email': email,
				'username': username,
				'password': password
			});

			res.send("Works")
			// User.save(newUser, (err, doc) => {
			// 	if (err) return err;
			// 	// return res.json(savedUser)
      //   console.log("user saved");
			// });
		// })
});

// router.post('/', (req, res) => {
// 	console.log("home hit")
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

module.exports = router;
