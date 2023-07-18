const { Router } = require('express');
const gamesController = require('../../controller/games.controller.js');

const gRouter = Router(); 

gRouter.get('/', gamesController.getAll);
gRouter.get('/:gameId', gamesController.getGame);
gRouter.post('/insert', gamesController.insertOneGame);

module.exports = gRouter;