var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("../models/user");
const Applicant = require("../models/applicant");

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
      // faudra ajouter erreur si compte existe deja avec ce mail...
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const phoneNumber = req.body.phoneNumber;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        await User.create(email, hash, lastName, firstName, phoneNumber);
        const userId = await User.getIdByEmail(email)
        await Applicant.create(userId);
    });
    res.redirect("/login");
  })
);

module.exports = router;
