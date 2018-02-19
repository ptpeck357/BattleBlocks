const router = require("express").Router();
const User = require('../../models/users.js');

router.post('/signup', (req, res) => {
	const { email, username, password } = req.body
  console.log(email)
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

      console.log(newUser);

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
