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
      //Si lanzamos un SELECT, el resultado SIEMPRE es un array
      const [games] = await gamesModel.getById(req.params.gameId);
      //Como la query se está lanzando sobre un resultado UNIQUE(id), el resultado es un array con un cliente (el id existe) o un array con cero games (el id NO existe)
      if (games.length === 0) {
          return res.json({ fatal: 'No existe un cliente con ese ID' });
      }
      res.json(games[0]);

  } catch (error) {
      res.json({ fatal: error.message });
  }
}

module.exports = { getAll, insertOneGame, getGame };
