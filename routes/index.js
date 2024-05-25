var express = require('express');
var router = express.Router();

const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {

  if (true) {
    return;
  } else {
    res.send('Nom d\'utilisateur ou mot de passe incorrect.');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/create-account', (req, res, next) => {
  res.render('create_account');
});

router.get('/admin', (req, res, next) => {
  res.render('admin/home');
});

router.get('/applicant', (req, res, next) => {
  res.render('applicant/home');
});

router.get('/recruiter', (req, res, next) => {
  res.render('recruiter/home');
})


module.exports = router;
