const gamesModel = require('../model/games.model.js');

const getAll = async (req, res) => {
  try {
    const [games] = await gamesModel.getGames();
    res.json(games);
  } catch (e) {
    res.json({ error: e });
  }
};

const insertOneGame = async (req, res) => {
  try {
    const [inserted] = await gamesModel.insertNewGame(req.body);
    if ('insertId' in inserted) {
      const [gameInsertado] = await gamesModel.getGameById(inserted.insertId);
      res.json(gameInsertado);
    } else {
      throw new Error('Ha fallado la insersión del juego');
    }
  } catch (e) {
    res.json({ error: e });
  }
};

const getGame = async (req, res) => {
  try {
    const [games] = await gamesModel.getById(req.params.gameId);
    const [genres] = await gamesModel.getGenresFromGameId(req.params.gameId);
    if (games.length === 0) {
      return res.json({ fatal: 'No existe un juego con ese ID' });
    }
    games[0].genres = genres;
    res.json(games[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getGamesByPage = async (req, res) => {
  try {
    const games = await gamesModel.pagination(req.params.numberPage);
    res.json(games);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { gameId } = req.params;
    const [result] = await gamesModel.remove(gameId);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const [genres] = await gamesModel.getGenres();
    res.json(genres);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getAllGamesByGenre = async (req, res) => {
  try {
    const [games] = await gamesModel.getByGenre(req.params.genreDescription);
    res.json(games);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getGamesByGenreAndPage = async (req, res) => {
  try {
    const games = await gamesModel.genrePagination(req.params.genreDescription, req.params.numberPage);
    res.json(games);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getGamesByTitle = async (req, res) => {
  try {
    const [games] = await gamesModel.getByTitle(req.params.gameTitle);
    res.json(games);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getGamesByTitleAndPage = async (req, res) => {
  try {
    const games = await gamesModel.titlePagination(req.params.gameTitle, req.params.numberPage);
    res.json(games);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const genreAndTitlePagination = async (req, res) => {
  try {
    const params = req.params;
    const games = await gamesModel.genreAndTitlePagination(params.genreDescription, params.gameTitle, params.numberPage);
    res.json(games);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

module.exports = {
  getAll,
  insertOneGame,
  getGame,
  getGamesByPage,
  deleteById,
  getAllGamesByGenre,
  getGamesByGenreAndPage,
  getAllGenres,
  getGamesByTitle,
  getGamesByTitleAndPage,
  genreAndTitlePagination,
};
