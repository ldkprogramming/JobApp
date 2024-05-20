var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.get('/create-account', (req, res, next) => {
  res.render('create_account');
})

module.exports = router;
