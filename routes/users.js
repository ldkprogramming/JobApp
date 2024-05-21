var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');

const User = require('../models/user');

/* GET all users. */
router.get('/', asyncHandler(async (req, res, next) => {
  const users = await User.getAll();
  res.render('admin/manage_users', {users: users})
}));

module.exports = router;
