const { Router } = require('express');
const gamesController = require('../../controller/games.controller.js');

const gRouter = Router(); 

gRouter.get('/', gamesController.getAll);

gRouter.post('/insert', gamesController.insertOneGame);

module.exports = gRouter;