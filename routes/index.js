var express = require('express');
var router = express.Router();
const session = require('express-session');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', asyncHandler(async (req, res, next) => {
      if (await User.isLoginValid(req.body.email, req.body.password)) {
        req.session.email = req.body.email;
        // ajouter un attribut pour le user id ?
        req.session.roles = await User.getRolesByEmail(req.body.email);
        res.send('Authentification réussie !');
      } else {
        res.send({
          'message' : 'Nom d\'utilisateur ou mot de passe incorrect.',
          'test' : 'hey',
          'email' : req.body.email,
          'password' : req.body.password
        });
      }
    }

));

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
