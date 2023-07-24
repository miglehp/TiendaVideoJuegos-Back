const { Router } = require('express');
const gamesController = require('../../controller/games.controller');

const gRouter = Router();

// Get Games
gRouter.get('/', gamesController.getAll);
gRouter.get('/paginate/:numberPage', gamesController.getGamesByPage);

// Ordenar por precio
gRouter.get('/maxPrice', gamesController.getByMaxPrice);
gRouter.get('/minPrice', gamesController.getByMinPrice);

// Filtrado por genero con paginación
gRouter.get('/genre', gamesController.getAllGenres);
gRouter.get('/genre/:genreDescription', gamesController.getAllGamesByGenre);
gRouter.get('/genre/:genreDescription/paginate/:numberPage', gamesController.getGamesByGenreAndPage);

// Obetener 1 juego por ID
gRouter.get('/:gameId', gamesController.getGame);

// Insertar un juego nuevo
gRouter.post('/insert', gamesController.insertOneGame);

// Eliminar un juego
gRouter.delete('/:gameId', gamesController.deleteById);

module.exports = gRouter;
