const LocalStrategy = require("passport-local").Strategy,
	UserDB = require("../src/data/UserDB"),
	User = new UserDB();

module.exports = function(passport) {
	//serializing the user => store user.id into the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	//deserializing the user => retrieve user instance from user database by the user.id stored in the session
	passport.deserializeUser(function(id, done) {
		User.findUserById(id, function(err, user) {
			done(err, user);
		});
	});

	// login authentication configuration => use local strategy
	passport.use(
		"local-login",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			},
			function(req, email, password, done) {
				// Find the user by username. If there is no user with the given username & password
				// set the user to `false` to indicate failure. Otherwise, return the user
				console.log("test1");
				User.findUserByEmail(email, password, function(err, user) {
					if (err) return done(err);
					if (!user) {
						return done(null, false);
					} else {
						return done(null, user);
					}
				});
			}
		)
	);

	// signup authentication configuration => use local strategy
	passport.use(
		"local-signup",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			},
			function(req, email, password, done) {
				// verify double-input of passwords matching. If failed, set the user to `false` to indicate failure.
				if (password !== req.body.password_confirm) {
					return done(
						null,
						false,
						req.flash("signupMessage", "Password doesn't match.")
					);
				}
				// verify the availibility of the username and email. If failed, set the user to `false` to indicate failure.
				if (User.users.find((user) => user.email === email)) {
					return done(
						null,
						false,
						req.flash(
							"signupMessage",
							"Username or email has already been taken."
						)
					);
				} else {
					// create a new user and insert it into the database, then return the user instance.
					// passport local strategy only supports usernameField(email) and passwordField,
					// so the firstname and lastname have to be pulled out from req.body object
					const user = User.createUser(
						req.body.firstname,
						req.body.lastname,
						password,
						email
					);
					console.log(User.users);
					return done(
						null,
						user,
						req.flash("signupMessage", "User registered successfully.")
					);
				}
			}
		)
	);
};
