const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');
const errorHandler = require('../middleware/errorHandler');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Index' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Cadastrar' });
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});

router.use(errorHandler);

module.exports = router;

