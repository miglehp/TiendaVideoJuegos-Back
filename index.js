const http = require('http');
const { app } = require('./src/app/app');
require('dotenv/config');

const server = http.createServer(app);
const PORT = process.env.PORT ?? 3000;

server.listen(PORT);

server.on('listening', () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

server.on('error', (e) => {
  console.error(e);
});
