const screenshotsModel = require('../model/screenshots.model');

const getAllScreenshotsFromGameId = async (req, res) => {
  try {
    const [screenshots] = await screenshotsModel.getScreenshotsFromGameId(req.params.gameId);
    if (screenshots.length === 0) {
      return res.json({ fatal: 'No existen capturas de pantalla para un juego con ese ID' });
    }
    res.json(screenshots);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

module.exports = { getAllScreenshotsFromGameId };
