const db = require('../../config/db');

const getGames = () => {
  return db.query('select * from games');
};

const insertNewGame = (objectGame) => {
  return db.query(
    'INSERT INTO games (steam_app_id, name, detailed_description, about_the_game, short_description, header_image, capsule_image, capsule_imagev5, website, pc_requirements_minimum, pc_requirements_recomended, mac_requirements, linux_requirements, developers, publishers, price, release_date, support_info_url, suport_info_email)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      objectGame.steam_app_id,
      objectGame.name ? objectGame.name : null,
      objectGame.detailed_description ? objectGame.detailed_description : null,
      objectGame.about_the_game ? objectGame.about_the_game : null,
      objectGame.short_description ? objectGame.short_description.slice(0, 255) : null,
      objectGame.header_image ? objectGame.header_image : null,
      objectGame.capsule_image ? objectGame.capsule_image : null,
      objectGame.capsule_imagev5 ? objectGame.capsule_imagev5 : null,
      objectGame.website ? objectGame.website : null,
      objectGame.pc_requirements_minimum ? objectGame.pc_requirements_minimum : null,
      objectGame.pc_requirements_recommended ? objectGame.pc_requirements_recommended : null,
      objectGame.mac_requirements ? objectGame.mac_requirements : null,
      objectGame.linux_requirements ? objectGame.linux_requirements : null,
      objectGame.developers ? objectGame.developers.join(', ') : null,
      objectGame.publishers ? objectGame.publishers.join(', ') : null,
      objectGame.price,
      objectGame.release_date ? objectGame.release_date : null,
      objectGame.support_info_url ? objectGame.support_info_url : null,
      objectGame.suport_info_email ? objectGame.suport_info_email : null,
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
    const genreId = genreIdResult.length > 0 ? genreIdResult[0][0].id : null;

    if (genreId) {
      await insertGameGenreRelation(gameId, genreId);
    } else {
      console.log('El género no fue encontrado o es nulo.');
    }

    console.log(`Se ha insertado correctamente el juego ${gameId} y se ha relacionado con el genero ${genreId}.`);
  } catch (error) {
    console.error('Error al realizar la operación:', error);
  }
};

const getById = (gameId) => {
  return db.query('select * from games where id = ?', [gameId]);
};

const pagination = async (numberPage = 1) => {
  const startingGame = (numberPage - 1) * 15;
  const totalGameCount = await db.query('SELECT COUNT(*) AS total_registros FROM ecomercedb.games');
  const totalGames = totalGameCount[0][0].total_registros;
  const result = await db.query(`select * from games limit ${startingGame}, 15`);

  return {
    current_page: Number(numberPage),
    max_pages: Math.ceil(totalGames / 15),
    result: result[0],
  };
};

const remove = (gameId) => {
  return db.query('delete from games where id = ?', [gameId]);
};

const getGenresFromGameId = (gameId) => {
  return db.query('SELECT gn.description FROM games AS g JOIN games_has_genres AS gg ON g.id = gg.games_id JOIN genres AS gn ON gg.genres_id = gn.id WHERE g.id = ?;', [gameId]);
};

const getGenres = () => {
  return db.query(`SELECT * FROM genres ORDER BY description ASC;`);
};

const getByGenre = (genre) => {
  return db.query(`SELECT * FROM games AS g JOIN games_has_genres AS gg ON g.id = gg.games_id JOIN genres AS gn ON gg.genres_id = gn.id WHERE gn.description = ?;`, [genre]);
};

const genrePagination = async (genre, numberPage) => {
  const startingGame = (numberPage - 1) * 15;
  const totalGameCount = await db.query(
    `SELECT COUNT(g.id) AS total_juegos FROM games AS g JOIN games_has_genres AS gg ON g.id = gg.games_id JOIN genres AS gn ON gg.genres_id = gn.id WHERE gn.description = ?;`,
    [genre]
  );
  const totalGames = totalGameCount[0][0].total_juegos;
  const result = await db.query(
    `SELECT g.* FROM games AS g JOIN games_has_genres AS gg ON g.id = gg.games_id JOIN genres AS gn ON gg.genres_id = gn.id WHERE gn.description = ? LIMIT ?, 15;`,
    [genre, startingGame]
  );

  return {
    current_page: Number(numberPage),
    max_pages: Math.ceil(totalGames / 15),
    result: result[0],
  };
};

const getByTitle = (gameTitle) => {
  return db.query(`SELECT * FROM games WHERE name LIKE ?;`, [`%${gameTitle}%`]);
};

const titlePagination = async (gameTitle, numberPage) => {
  const startingGame = (numberPage - 1) * 15;
  const totalGameCount = await db.query(`SELECT COUNT(id) AS total_juegos FROM games WHERE name LIKE ?;`, [`%${gameTitle}%`]);
  const totalGames = totalGameCount[0][0].total_juegos;
  const result = await db.query(`SELECT * FROM games WHERE name LIKE ? LIMIT ${startingGame}, 15;`, [`%${gameTitle}%`]);

  return {
    current_page: Number(numberPage),
    max_pages: Math.ceil(totalGames / 15),
    result: result[0],
  };
};

const genreAndTitlePagination = async (genre, title, numberPage) => {
  const startingGame = (numberPage - 1) * 15;
  const totalGameCount = await db.query(
    `SELECT COUNT (g.id) AS total_juegos FROM games AS g, games_has_genres AS gg, genres AS gn WHERE g.id = gg.games_id AND gg.genres_id = gn.id AND gn.description = ? AND g.name LIKE ?;`,
    [genre, `%${title}%`]
  );
  const totalGames = totalGameCount[0][0].total_juegos;
  const result = await db.query(
    `SELECT g.* FROM games AS g, games_has_genres AS gg, genres AS gn WHERE g.id = gg.games_id AND gg.genres_id = gn.id AND gn.description = ? AND g.name LIKE ? LIMIT ?, 15;`,
    [genre, `%${title}%`, startingGame]
  );

  return {
    current_page: Number(numberPage),
    max_pages: Math.ceil(totalGames / 15),
    result: result[0],
  };
};

module.exports = {
  getGames,
  insertNewGame,
  insertScreenshot,
  insertGenreIfNotExists,
  insertGameGenreRelation,
  getGenreIdByDescription,
  insertGenreAndRelationIfNotExists,
  getById,
  pagination,
  remove,
  getGenresFromGameId,
  getByGenre,
  genrePagination,
  getGenres,
  getByTitle,
  titlePagination,
  genreAndTitlePagination,
};
