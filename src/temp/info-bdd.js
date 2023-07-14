const axios = require('axios');

const getAllJuegosFromSteam = async () => {
  const response = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
  let arrJuegos = response.data.applist.apps;
  return arrJuegos;
};

const getDetallesJuegoFromSteam = async (steamId) =>{
    const response = await axios.get(` http://store.steampowered.com/api/appdetails?appids=${steamId}`);
    let detallesJuego = response.data;
    detallesJuego = detallesJuego[steamId].data;
    return detallesJuego;
}

module.exports = { getAllJuegosFromSteam, getDetallesJuegoFromSteam };
