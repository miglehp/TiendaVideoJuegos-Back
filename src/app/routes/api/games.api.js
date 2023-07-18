const { Router } = require('express');
const gamesController = require('../../controller/games.controller.js');

const gRouter = Router(); 

gRouter.get('/', gamesController.getAll);
gRouter.get('/paginate/:numberPage', gamesController.getGamesByPage);
gRouter.get('/paginate/:numberPage/name/:gameName', gamesController.getNamesByPage);
//gRouter.get('/paginate/:numberPage/category/:gameCategory', gamesController.getCategoryByPage);
gRouter.get('/:gameId', gamesController.getGame);
gRouter.post('/insert', gamesController.insertOneGame);
gRouter.delete('/:gameId', gamesController.deleteById);

module.exports = gRouter;