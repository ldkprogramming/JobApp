var express = require("express");
var router = express.Router();
const session = require("express-session");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    if (await User.isLoginValid(req.body.email, req.body.password)) {
      req.session.email = req.body.email;
      req.session.rolesIdMap = await User.getRolesIdMapByEmail(req.body.email);
      if (req.session.rolesIdMap.adminId) {
        res.redirect(`/admins/${req.session.rolesIdMap.adminId}`);
      } else if (req.session.rolesIdMap.recruiterId) {
        res.redirect(`/recruiters/${req.session.rolesIdMap.recruiterId}`);
      } else if (req.session.rolesIdMap.applicantId) {
        res.redirect(`/applicants/${req.session.rolesIdMap.applicantId}`);
      }
    } else {
      res.render(`incorrect`);
    }
  })
);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/create-account", (req, res, next) => {
  res.render("create_account");
});

module.exports = router;
