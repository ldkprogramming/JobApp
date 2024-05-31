var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");

const User = require("../models/user");

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const phoneNumber = req.body.phoneNumber;
    await User.create(email, password, lastName, firstName, phoneNumber);
    res.redirect("/users");
  })
);

module.exports = router;
