const User = require('../models/users.js')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(

	function(username, password, done) {
		User.findOne({ 'username': username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false)
				
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false)
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy
