var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require('express-session');
var sessionUtility = require('./our_modules/sessionUtility');

// router setup
var indexRouter = require("./routes/index");
var testingRouter = require("./routes/testing");
var usersRouter = require("./routes/users");
var organisationRegistrationRequests = require("./routes/adminOrganisations");
var recruiterRegistrationRequests = require("./routes/recruiterOrganisations");
var jobOffersRouter = require("./routes/jobOffers");
var jobApplicationsRouter = require("./routes/jobApplications");
var jobDescriptionsRouter = require("./routes/jobDescriptions");
var applicantsRouter = require('./routes/applicants');
var adminsRouter = require('./routes/admins');
var recruitersRouter = require('./routes/recruiters');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// session setup
app.use(session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: false,
  cookie : {
    maxAge: 60 * 60 * 1000 // 1 h
  }
}));

// secure paths setup
app.all("*", (req, res, next) => {
  const unsecuredPaths = ['/login', '/logout', '/create-account', '/users', '/testing/who-am-i'];

  if (unsecuredPaths.includes(req.path)) {
    return next();
  }
  if (sessionUtility.isLoggedIn(req.session)) {
    return next();
  }
  res.status(403).render("error", { message: `error *: ${Object.keys(req.params)}`, error: {} });
});

app.all("/admins/:idAdmin*", (req, res, next) => {
  if (Number(req.params.idAdmin) === req.session.rolesIdMap.adminId) {
    return next();
  }
  res.status(403).render("error", { message: `error admins: ${req.params.idAdmin} !== ${req.session.rolesIdMap.adminId}`, error: {} });
});

app.all("/recruiters/:idRecruiter*", (req, res, next) => {
  if (Number(req.params.idRecruiter) === req.session.rolesIdMap.recruiterId) {
    return next();
  }
  res.status(403).render("error", { message: `error`, error: {} });
});

app.all("/applicants/:idApplicant*", (req, res, next) => {
  if (Number(req.params.idApplicant) === req.session.rolesIdMap.applicantId) {
    return next();
  }
  res.status(403).render("error", { message: `error admins: ${req.params.idAdmin} !== ${req.session.rolesIdMap.adminId}`, error: {} });
});

// use routers
app.use("/", indexRouter);
app.use("/testing", testingRouter);
app.use("/users", usersRouter);
app.use(
  "/organisation-registration-requests",
  organisationRegistrationRequests
);
app.use("/recruiter-registration-requests", recruiterRegistrationRequests);
app.use("/job-offers", jobOffersRouter);
app.use("/job-applications", jobApplicationsRouter);
app.use("/job-descriptions", jobDescriptionsRouter);
app.use("/applicants", applicantsRouter);
app.use("/admins", adminsRouter);
app.use("/recruiters", recruitersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
