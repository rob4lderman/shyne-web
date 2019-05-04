var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var termsRouter = require('./routes/terms');
var privacyRouter = require('./routes/privacy');

var app = express();

/**
 * HTTPS
 * On heroku (production), SSL is handled by heroku's router/firewall and
 * our app only opens a non-SSL port and always receives non-SSL traffic
 * behind the firewall.
 *
 * To force clients to use SSL, we must use the x-forwarded-proto header
 * to check if the original client request went to https. If not, redirect them.
 *
 */
// -rx- if ( process.env.NODE_ENV == 'production' ) {
    app.use( (req, res, next) => {
        if (req.headers['x-forwarded-proto'] != 'https' && req.hostname != "localhost") {
            res.redirect(301, 'https://' + req.hostname + req.originalUrl);
        } else {
            next();
        }
    });
// -rx- } 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/terms', termsRouter);
app.use('/privacy', privacyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
