const { Router } = require('express');
const pedidosController = require('../../controller/pedidos.controller.js');

const pRouter = Router();

pRouter.get('/', pedidosController.getAll);

module.exports = pRouter;
