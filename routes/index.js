const express   = require('express'),
      passport  = require('passport'),
      path      = require('path'),
      router    = express.Router();

//import passport module 
require('./passport')(passport);

//Get homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'));
})
    //Update home page with converted 

//user login
router.route('/login')
    //render to user login page
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../login.html'));
    })
    //handle user login authentication request, 
    //if failed, redirect user to login page. Otherwise redirect to dashboard
    .post(passport.authenticate('local-login', 
        { 
            failureRedirect: '/login',
            successRedirect: '/users/protected',
            failureFlash: 'invalid username or password.'
        })
    );
    
//user register
router.route('/register')
    //reander to user registration page
    .get((req, res) => {
        res.render('register', {error:false});       
    })
    //handle user registeration request
    //if failed, redirect user to register page. Otherwise redirect to dashboard
    .post(passport.authenticate('local-signup', 
        { 
            failureRedirect: '/register',
            successRedirect: '/users/protected',
            failureFlash: 'invalid username or password.'
        })
    );
              
module.exports = router;
