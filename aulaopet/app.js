const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const helmet = require('helmet');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const signupRoutes = require('./routes/signup');

const constants = require('./config/constants');
const errorHandler = require('./middleware/errorHandler');
const app = express();

// Configuração do passport
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(user => user.username === username && user.password === password);
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);
  done(null, user);
});

// Configuração do app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);
// Rotas
app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/signup', signupRoutes);
app.use('/dashboard', dashboardRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;

