const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/users');

passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===')
	console.log('---------' + user._id)
	done(null, user._id)
})

passport.deserializeUser((_id, done) => {
	console.log('Deserialize ... called')
	User.findOne(
		{
			_id: _id
		}
	).then(function(currentUser){
		done(null, currentUser);
		console.log("user foundddd")
    });
});

// ==== Register Strategies ====
passport.use(LocalStrategy)

module.exports = passport
