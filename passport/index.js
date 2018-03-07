const passport = require('passport');
const LocalStrategy = require('./localstrategy');
const User = require('../models/users');

passport.serializeUser((user, done) => {
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	User.findOne({_id: id}, (err, user) => {
		done(null, user)
	});
});

// ==== Register Strategies ====
passport.use(LocalStrategy)

module.exports = passport
