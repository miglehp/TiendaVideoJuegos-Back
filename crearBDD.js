const { insertNewGame, insertScreenshot, insertGenreAndRelationIfNotExists } = require('./src/app/model/games.model');
const { getAllJuegosFromSteam, getDetallesJuegoFromSteam } = require('./src/temp/info-bdd');

const generarPrice = () => {
  const price = (Math.random() * 70).toFixed(2);
  return price;
};

(async () => {
  try {
    const arrAllJuegos = await getAllJuegosFromSteam();
    arrAllJuegos.reverse();

    const maxGamesToInsert = 1500;

    for (let i = 0; i < maxGamesToInsert; i++) {
      const juego = arrAllJuegos[i];
      try {
        const detallesJuego = await getDetallesJuegoFromSteam(juego.appid);

        detallesJuego.steam_app_id = detallesJuego.steam_appid ? detallesJuego.steam_appid : null;
        detallesJuego.price = generarPrice();
        detallesJuego.support_info_url = detallesJuego.support_info.url;
        detallesJuego.support_info_email = detallesJuego.support_info.email;
        detallesJuego.mac_requirements = detallesJuego.mac_requirements.minimum;
        detallesJuego.linux_requirements = detallesJuego.linux_requirements.minimum;
        detallesJuego.release_date = detallesJuego.date;
        console.log(detallesJuego.name, detallesJuego.steam_app_id);

        if (detallesJuego.steam_app_id) {
          const insertedGame = await insertNewGame(detallesJuego);
          const insertedGameId = insertedGame[0].insertId;

          if (detallesJuego.screenshots) {
            for (const screenshot of detallesJuego.screenshots) {
              await insertScreenshot(insertedGameId, screenshot);
            }
          }

          if (detallesJuego.genres) {
            for (const genre of detallesJuego.genres) {
              await insertGenreAndRelationIfNotExists(insertedGameId, genre.description);
            }
          }
        }
      } catch (error) {
        console.error('Error al insertar el juego:', error);
      }
    }
  } catch (error) {
    console.log('Error al insertar el juego:', error);
  }
})();
