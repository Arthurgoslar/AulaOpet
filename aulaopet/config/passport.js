const passport = require('passport');
const passportLocal = require('passport-local');
const passportJwt = require('passport-jwt');
const constants = require('./constants');
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');

passport.use(new passportJwt.Strategy({
    secretOrKey: constants.JWT_SECRET,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done) => {
    const user = users.find(user => user.id === payload.sub);
    if (!user) {
        return done(null, false);
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    if (!user) {
        return done(null, false);
    }
    return done(null, user);
});

passport.use('signup', new passportLocal.Strategy({
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const { email } = req.body;

    const userExists = users.find(user => user.username === username || user.email === email);
    if (userExists) {
      return done(null, false, { message: 'Nome de usuário ou e-mail já em uso.' });
    }

    const id = Date.now().toString();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id, username, email, password: hashedPassword };
    users.push(newUser);

    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
}));
