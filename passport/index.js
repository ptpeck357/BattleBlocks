const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/users');

passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===')
	console.log('---------' + user._id)
	done(null, user._id)
})

passport.deserializeUser((_id, done) => {
	console.log('Deserialize ... called. user Id is: ' + _id)
	User.findOne(
		{_id: _id},
		(err, user) => {
			console.log('======= DESERILAIZE USER CALLED ======')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
});

// ==== Register Strategies ====
passport.use(LocalStrategy)

module.exports = passport
