let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let mongoose = require("mongoose");
let User = mongoose.model("User");

passport.use(
	new LocalStrategy(
		{
			usernameField: "user[email]",
			passwordField: "user[password]",
		},
		function (email, password, done) {
			User.findOne({
				email: { $regex: new RegExp("^" + email + "$", "i") },
			})
				.then(function (user) {
					if (!user || !user.validPassword(password))
						return done(null, false, { error: "Username or password is invalid!!" });

					return done(null, user);
				})
				.catch(done);
		}
	)
);
