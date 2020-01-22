const express = require("express"),
	passport = require("passport"),
	path = require("path"),
	router = express.Router();

//import passport module
require("./passport")(passport);

//Get homepage
router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../home.html"));
});
//Update home page with converted

//user login
router
	.route("/login")
	//render to user login page
	.get((req, res, next) => {
		// console.log('test4');
		res.sendFile(path.join(__dirname, "../login.html"));
	})
	//handle user login authentication request,
	//if failed, redirect user to login page. Otherwise redirect to dashboard
	.post(
		passport.authenticate("local-login", {
			successRedirect: "/users/protected",
			failureRedirect: "/login",
			failureFlash: true
		})
	);

//user register
router
	.route("/register")
	//reander to user registration page
	.get((req, res, next) => {
		res.sendFile(path.join(__dirname, "../register.html"));
	})
	//handle user registeration request
	//if failed, redirect user to register page. Otherwise redirect to dashboard
	.post(
		passport.authenticate("local-signup", {
			successRedirect: "/users/protected",
			failureRedirect: "/register",
			failureFlash: true
		})
	);

module.exports = router;
