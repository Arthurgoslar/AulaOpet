const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const users = require('../data/users.json');
const tokens = require('../data/sessions.json');

function isAuthenticated(req, res, next) {

  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const payload = jwt.verify(token, constants.JWT_SECRET);

    const foundToken = tokens.tokens.find(t => t.id === payload.jti);

    if (!foundToken) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const user = users.find(user => user.id === foundToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    req.user = user;

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = isAuthenticated;

