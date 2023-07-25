const express = require('express');
const { router } = require('./routes/api');
const cors = require('cors');

const app = express();

//const pedidoController = require('./pedidoController');

// Ruta para actualizar el estado del pedido y enviar la notificación
//app.put('/api/pedidos/:id', pedidoController.actualizarEstadoPedido);

app.use(cors(), express.json());

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use('/api', router);

module.exports = { app };
