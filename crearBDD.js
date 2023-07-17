const { getAllJuegosFromSteam, getDetallesJuegoFromSteam } = require('./src/temp/info-bdd');

(async () => {
    const arrAllJuegos = await getAllJuegosFromSteam();
    for (let juego of arrAllJuegos){
        const detallesJuego = await getDetallesJuegoFromSteam(juego.appid);
        
    }
})();