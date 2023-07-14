const { getAllJuegosFromSteam, getDetallesJuegoFromSteam } = require('./src/temp/info-bdd');

const arrAllJuegos = getAllJuegosFromSteam();

const detallesCounterStrike = getDetallesJuegoFromSteam('10');


