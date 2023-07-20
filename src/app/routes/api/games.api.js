const { Router } = require('express');
const gamesController = require('../../controller/games.controller.js');

const gRouter = Router(); 

gRouter.get('/', gamesController.getAll);
gRouter.get('/maxPrice', gamesController.getByMaxPrice);
gRouter.get('/minPrice', gamesController.getByMinPrice);
gRouter.get('/paginate/:numberPage', gamesController.getGamesByPage);
gRouter.get('/paginate/:numberPage/name/:gameName', gamesController.getNamesByPage);
gRouter.get('/paginate/:numberPage/category', gamesController.getCategoryByPage);
gRouter.get('/paginate/:numberPage/category/:gameCategory', gamesController.filterCategoryByPage);
gRouter.get('/:gameId', gamesController.getGame);
gRouter.post('/insert', gamesController.insertOneGame);
gRouter.delete('/:gameId', gamesController.deleteById);

module.exports = gRouter;