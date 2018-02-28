const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/users');

passport.serializeUser((user, done) => {
	console.log('=== serialize --- called ===')
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	console.log('Deserialize === called === user Id is: ' + id)
	User.findOne({_id: id}, (err, user) => {
		console.log('======= DESERILAIZE USER CALLED ======')
		done(null, user)
	});
});

// ==== Register Strategies ====
passport.use(LocalStrategy)

module.exports = passport
