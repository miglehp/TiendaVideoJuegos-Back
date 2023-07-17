const db = require('../../config/db');

const getGames = () => {
  return db.query('select * from games');
};

const insertNewGame = (objectGame) => {
  return db.query(
    'INSERT INTO games (steam_app_id, name, detailed_description, about_the_game, short_description, header_image, capsule_image, capsule_imagev5, website, pc_requirements_minimum, pc_requirements_recomended, mac_requirements, linux_requirements, developers, publishers, price, release_date, support_info_url, suport_info_email)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      objectGame.steam_app_id,
      objectGame.name,
      objectGame.detailed_description,
      objectGame.about_the_game,
      objectGame.short_description.slice(0, 255),
      objectGame.header_image,
      objectGame.capsule_image,
      objectGame.capsule_imagev5,
      objectGame.website,
      objectGame.pc_requirements_minimum,
      objectGame.pc_requirements_recommended,
      objectGame.mac_requirements,
      objectGame.linux_requirements,
      objectGame.developers.join(', '),
      objectGame.publishers.join(', '),
      objectGame.price,
      objectGame.release_date,
      objectGame.support_info_url,
      objectGame.suport_info_email,
    ]
  );
};

const insertScreenshot = (gameId, screenshot) => {
  return db.query('INSERT INTO screenshots (games_id, path_thumbnail, path_full) VALUES (?, ?, ?)', [gameId, screenshot.path_thumbnail, screenshot.path_full]);
};

const insertGenreIfNotExists = (genre) => {
  return db.query('INSERT IGNORE INTO genres (description) VALUES (?)', [genre]);
};

const getGenreIdByDescription = (genre) => {
  return db.query('SELECT id FROM genres WHERE description = ?', [genre]);
};

const insertGameGenreRelation = (gameId, genreId) => {
  return db.query('INSERT INTO games_has_genres (games_id, genres_id) VALUES (?, ?)', [gameId, genreId]);
};

const insertGenreAndRelationIfNotExists = async (gameId, genre) => {
  try {
    await insertGenreIfNotExists(genre);
    const genreIdResult = await getGenreIdByDescription(genre);
    const genreId = genreIdResult.length > 0 ? genreIdResult[0].id : null;

    if (genreId) {
      await insertGameGenreRelation(gameId, genreId);
    }
    console.log(`Se ha insertado correctamente el juego ${gameId} y se ha relacionado con el genero ${genreId}.`);
  } catch (error) {
    console.error('Error al realizar la operación:', error);
  }
};

module.exports = { getGames, insertNewGame, insertScreenshot, insertGenreIfNotExists, insertGameGenreRelation, getGenreIdByDescription, insertGenreAndRelationIfNotExists };
