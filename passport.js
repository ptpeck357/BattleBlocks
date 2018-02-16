const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/users')

const strategy = new LocalStrategy(
	{
		username: 'username'
	},
	function(username, password, done) {
		User.findOne({ 'local.username': username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

passport.serializeUser((user, done) => {
  console.log('=== serialize ... called ===')
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  db.User.findOne({
      where: {
          _id: _id
        }
  }).then((user) =>{
      done(null, user.data);
  });
});

passport.use(LocalStrategy)

module.exports = passport
