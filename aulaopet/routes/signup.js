const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../data/users.json');
const dataManager = require('../data/dataManager');
const { checkAvailability } = require('../middleware/checkAvailability');
const constants = require('../config/constants');


router.post('/signup', checkAvailability, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const id = Date.now().toString();

    const newUser = { id, username, email, password: password };
    users.push(newUser);

    dataManager.saveData(users, 'users.json');

    const token = jwt.sign({ id, username }, constants.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao registrar usuário.');
  }
});

module.exports = router;

