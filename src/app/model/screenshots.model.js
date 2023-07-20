const db = require('../../config/db');

const getScreenshotsFromGameId = (gameId) => {
    return db.query('SELECT * FROM ecomercedb.screenshots WHERE games_id = ?;', [gameId]);
}

module.exports = { getScreenshotsFromGameId };