const { insertNewGame, insertScreenshot, insertGenreAndRelationIfNotExists } = require('./src/app/model/games.model');
const { getAllJuegosFromSteam, getDetallesJuegoFromSteam } = require('./src/temp/info-bdd');

/*
*
*   Esto aún no funciona.
*
*
*/

(async () => {
  try {
    //const arrAllJuegos = await getAllJuegosFromSteam();
    // for (let juego of arrAllJuegos){

    const detallesJuego = await getDetallesJuegoFromSteam(10);

    detallesJuego.steam_app_id = detallesJuego.steam_appid;
    detallesJuego.price = detallesJuego.price_overview.initial;
    detallesJuego.support_info_url = detallesJuego.support_info.url;
    detallesJuego.support_info_email = detallesJuego.support_info.email;
    detallesJuego.mac_requirements = detallesJuego.mac_requirements.minimum;
    detallesJuego.linux_requirements = detallesJuego.linux_requirements.minimum;
    detallesJuego.release_date = detallesJuego.date;

    const insertedGame = await insertNewGame(detallesJuego);
    const insertedGameId = insertedGame[0].insertId;

    for (const screenshot of detallesJuego.screenshots) {
      await insertScreenshot(insertedGameId, screenshot);
    }

    for (const genre of detallesJuego.genres) {
      await insertGenreAndRelationIfNotExists(insertedGameId, genre.description);
    }

    // }
  } catch (error) {
    console.error('Error al insertar el juego:', error);
  }
})();
