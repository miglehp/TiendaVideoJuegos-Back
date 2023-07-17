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

module.exports = { getAll, insertOneGame };
