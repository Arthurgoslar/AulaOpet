const users = require('../data/users.json');

const checkAvailability = (req, res, next) => {
  const { username, email } = req.body;

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).send('Nome de usuário já existe.');
  }

  const emailExists = users.find(user => user.email === email);
  if (emailExists) {
    return res.status(400).send('E-mail já em existe.');
  }

  next();
};

module.exports = { checkAvailability };

