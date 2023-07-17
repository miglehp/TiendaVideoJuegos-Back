const db = require('../../config/db');

const getGames = () => {
  return db.query('select * from games');
};

const insertNewGame = (objectGame) => {
    return db.query(
      'INSERT INTO games (steam_app_id, detailed_description, about_the_game, short_description, header_image, capsule_image, capsule_imagev5, website, pc_requirements_minimum, pc_requirements_recomended, mac_requirements, linux_requirements, developers, publishers, price, release_date, support_info_url, suport_info_email)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        objectGame.steam_app_id,
        objectGame.detailed_description,
        objectGame.about_the_game,
        objectGame.short_description,
        objectGame.header_image,
        objectGame.capsule_image,
        objectGame.capsule_imagev5,
        objectGame.website,
        objectGame.pc_requirements_minimum,
        objectGame.pc_requirements_recommended,
        objectGame.mac_requirements,
        objectGame.linux_requirements,
        objectGame.developers,
        objectGame.publishers,
        objectGame.price,
        objectGame.release_date,
        objectGame.support_info_url,
        objectGame.suport_info_email,
      ]
    );
  };
  
module.exports = { getGames, insertNewGame};