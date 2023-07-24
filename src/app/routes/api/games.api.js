const { Router } = require('express');
const gamesController = require('../../controller/games.controller');

const gRouter = Router();

gRouter.get('/', gamesController.getAll);
gRouter.get('/paginate/:numberPage', gamesController.getGamesByPage);

gRouter.get('/maxPrice', gamesController.getByMaxPrice);
gRouter.get('/minPrice', gamesController.getByMinPrice);

gRouter.get('/genre/:genreDescription', gamesController.getAllGamesByGenre);
gRouter.get('/genre/:genreDescription/paginate/:numberPage', gamesController.getGamesByGenreAndPage);

gRouter.get('/:gameId', gamesController.getGame);

gRouter.post('/insert', gamesController.insertOneGame);

gRouter.delete('/:gameId', gamesController.deleteById);

module.exports = gRouter;
