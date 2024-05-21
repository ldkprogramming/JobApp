var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// router setup
var indexRouter = require('./routes/index');
var testingRouter = require('./routes/testing');
var usersRouter = require('./routes/users');
var organisationRegistrationRequests = require('./routes/adminOrganisations');
var recruiterRegistrationRequests = require('./routes/recruiterOrganisations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routers
app.use('/', indexRouter);
app.use('/testing', testingRouter);
app.use('/users', usersRouter);
app.use('/organisation-registration-requests', organisationRegistrationRequests);
app.use('/recruiter-registration-requests', recruiterRegistrationRequests);

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
