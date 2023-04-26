const http = require('http');
const app = require('./app');
const constants = require('./config/constants');
const dataManager = require('./data/dataManager');

// Conecta-se ao banco de dados JSON
dataManager.connect();

// Cria o servidor HTTP
const server = http.createServer(app);

// Define a porta do servidor
const port = process.env.PORT || 3000;

// Inicia o servidor HTTP
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado na porta ${port}`);
});

