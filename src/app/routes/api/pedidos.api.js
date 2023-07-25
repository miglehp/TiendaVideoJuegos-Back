const { Router } = require('express');
const pedidosController = require('../../controller/pedidos.controller.js');

const pRouter = Router();

// requieren ser admin
pRouter.get('/', pedidosController.getAll);
pRouter.get('/:pedidoId', pedidosController.getById);

// solo requieren estar logado
pRouter.get('/user', pedidosController.getFromUserId);

module.exports = pRouter;
