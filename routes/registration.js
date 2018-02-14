const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressValidator = require("express-validator");

/* renders 'signup' handlebars on get request */
router.get('/', function(req, res) {
    console.log("it works")
});

router.get('/', ensureAuthenticated, function(req, res) {

});

/* 'POST' request to register new user */
router.post('/signup', function(req, res, next) {

	const username = req.body.username;
	// const email = req.body.email;
	const password = req.body.password;
	const cpassword = req.body.password2;

	/* Validating field forms */
	req.checkBody('username', 'username is required').notEmpty();
	// req.checkBody('email', 'Email is required').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('cpassword', 'Password does not match').equals(req.body.password);

    const  errors = req.validationErrors();

    if(errors) {
        console.log(errors)
    }
    else if(isValid === false) {
    	fs.unlink(req.files[0].path, function(err){
			if(err) throw err;
		});
    	res.redirect('/authentication/signup');
    }
    else {
    	db.User.findOne({
	       where: {
	           username: username
	       }
	   }).then(function(user){
	        if(user === null){

	        	/* Creating new user */
		      	const newUser = {
					username: username,
					// email: email,
					password: password
				};

				/* Hiding the user's password in the database */
				bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(newUser.password, salt, function(err, hash) {
						newUser.password = hash;
				      	db.User.create(newUser).then(function(user) {
							res.redirect('/signin');
				      	});
				  	});
				});
	    	} else {
                // res.redirect('/authentication/signup');
            }
		});
    };
});

/* 'POST' request to login */
router.post('/signin',
  	passport.authenticate('local', {successRedirect:'/lobby', failureRedirect: '/signin', failureFlash: true}),
);

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        // res.render('signin');
    }
}

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.User.findOne({
            where: {
                username: username
              }
        }).then(function(user){
            if(user == null || user.dataValues.email !== username){
                return done(null, false, {message: 'Unknown User'});
            }
            else{
                bcrypt.compare(password, user.dataValues.password, function(err, isMatch){
                    if(isMatch){
                        return done(null, user.dataValues);
                    }
                    else{
                        return done(null, false, {message: 'Invalid Password'});
                    }
                });
            }
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.findOne({
        where: {
            id: id
          }
    }).then(function(user){
        done(null, user.dataValues);
    });
});

/* logout: removes user session */
router.get('/signout', function(req, res){
	req.logout();
	res.redirect('/signin');
});

module.exports = router;