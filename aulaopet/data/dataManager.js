const fs = require('fs');
const path = require('path');
const constants = require('../config/constants');

let users = [];
let sessions = [];

function loadData() {
  try {
    users = require('./users.json');
  } catch (err) {
    users = [];
  }

  try {
    sessions = require('./sessions.json');
  } catch (err) {
    sessions = [];
  }
}


function saveData() {
  try {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users));
  } catch (err) {
    console.error('Erro ao salvar credenciais de usuários:', err);
  }

  try {
    fs.writeFileSync(path.join(__dirname, 'sessions.json'), JSON.stringify(sessions));
  } catch (err) {
    console.error('Erro ao salvar dados de sessões:', err);
  }
}

function connect() {
  loadData();
}

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find(user => user.id === id);
}

function getUserByUsername(username) {
  return users.find(user => user.username === username);
}

function createUser(user) {
  const newUser = { id: Date.now().toString(), ...user };
  users.push(newUser);
  saveData();
  return newUser;
}

function updateUser(id, updates) {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }
  users[userIndex] = { ...users[userIndex], ...updates };
  saveData();
  return users[userIndex];
}

function deleteUser(id) {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }
  users.splice(userIndex, 1);
  saveData();
}

function addToken(token) {
  sessions.push(token);
  saveData();
}

function getTokenByUserId(userId) {
  return sessions.find(token => token.userId === userId);
}

function deleteToken(userId) {
  const sessionIndex = sessions.findIndex(token => token.userId === userId);
  if (sessionIndex === -1) {
    throw new Error('Token não encontrado');
  }
  sessions.splice(sessionIndex, 1);
  saveData();
}

module.exports = {
  connect,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  addToken,
  getTokenByUserId,
  deleteToken,
  saveData
};

