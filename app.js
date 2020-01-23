const createError   = require('http-errors'),
      express       = require('express'),
      passport      = require('passport'),
      session       = require("express-session"),
      flash         = require('connect-flash'),
      path          = require('path'),
      cookieParser  = require('cookie-parser'),
      indexRouter   = require('./routes/index'),
      userRouter    = require('./routes/users'),
      app           = express();
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//serve static content
app.use(express.static(path.join(__dirname, 'public')));

//authentication setup
//express session for retrieving user session data from datastore
app.use(session({ secret: '********' })); 
app.use(passport.initialize());
//passport session for deserializing user object from session
app.use(passport.session());
app.use(flash());
// caching disabled for every route => prevent back botton to access cached stricted page
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

//router setup
app.use('/users', userRouter);
app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.write('<h1>' + err.message + '</h1>');
});

module.exports = app;
