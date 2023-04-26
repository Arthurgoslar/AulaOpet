const express = require('express');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const users = require('../data/users.json');
const tokens = require('../data/sessions.json');
const passport = require('passport');

const router = express.Router();


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas tente novamente' });
  }
console.log(constants.JWT_SECRET);


  const token = jwt.sign({ sub: user.id }, constants.JWT_SECRET.key, { expiresIn: '1h', jwtid: `${user.id}-${Date.now()}` });


  tokens.tokens.push({ id: jwt.decode(token).jti, userId: user.id, createdAt: new Date() });


  return res.status(200).json({ token });
});


router.post('/logout', (req, res) => {

  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const index = tokens.tokens.findIndex(t => t.id === jwt.decode(token).jti);

  if (index === -1) {
    return res.status(401).json({ error: 'Token inválido' });
  }


  tokens.tokens.splice(index, 1);


  return res.status(200).json({ message: 'Deslogado com sucesso' });
});



module.exports = router;

