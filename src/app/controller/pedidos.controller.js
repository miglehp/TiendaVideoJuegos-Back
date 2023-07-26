const pedidosModel = require('../model/pedidos.model');
const db = require('../../config/db');

/* req.user
{
  id: 1,
  username: 'Miglehp',
  password: '$2a$08$I.L42SeAA7/8FjSn54btneX/sctqTQKN/xS0MqSDrZPkPujx.KAKi',
  email: 'migle.hp@gmail.com',
  active: 1,
  fecha_nacimiento: 1996-11-06T23:00:00.000Z,
  foto_perfil_url: null,
  es_admin: 1,
  validado: 0
}

req.esAdmin: boolean
*/

const getAll = async (req, res) => {
  try {
    if (req.esAdmin) {
      const [pedidos] = await pedidosModel.get();
      res.json({
        message: 'Todos los pedidos',
        pedidos: pedidos,
      });
    } else {
      res.json({ fatal: 'Solo los administradores pueden revisar todos los pedidos' });
    }
  } catch (e) {
    res.json({ fatal: e.message });
  }
};

const getById = async (req, res) => {
  try {
    if (req.esAdmin) {
      const [pedido] = await pedidosModel.getById(req.params.pedidoId);
      const [gamesArr] = await pedidosModel.getGamesFromPedido(req.params.pedidoId);
      let newArr = gamesArr.map((game) => game.games_id);
      res.json({
        message: `Detalles del pedido: ${req.params.pedidoId}`,
        pedido: pedido,
        games: newArr,
      });
    } else {
      res.json({ fatal: 'Solo los administradores pueden revisar todos los pedidos' });
    }
  } catch (e) {
    res.json({ fatal: e.message });
  }
};

const getFromUserId = async (req, res) => {
  try {
    const [pedidos] = await pedidosModel.getFromUserId(req.user.id);
    res.json({
      message: `Todos los pedidos del usuario: ${req.user.username}`,
      pedidos: pedidos,
    });
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const newPedidoWithGames = async (req, res) => {
  try {
    await db.query('START TRANSACTION;');
    let newPedido = await pedidosModel.newPedido(req.user.id);
    let pedidoId = newPedido[0].insertId;
    let gamesIds = req.body.games;
    for (const gameId of gamesIds) {
      await pedidosModel.newGameForPedido(pedidoId, gameId);
    }
    await db.query('COMMIT;');
    res.json({
      success: true,
      message: `se han insertado los juegos en el pedido ${pedidoId}`,
      juegos: gamesIds,
    });
  } catch (error) {
    await db.query('ROLLBACK;');
    res.json({ fatal: 'Error al crear el pedido.', error: error.message });
  }
};

const updateState = async (req, res) => {
  try {
    if (req.esAdmin) {
      const [pedido] = await pedidosModel.update(req.params.pedidoId, req.body.estado);
      res.json({
        message: 'Se ha actualizado el estado del pedido',
        response: pedido,
      });
    } else {
      res.json({ fatal: 'Solo los administradores pueden revisar todos los pedidos' });
    }
  } catch (e) {
    res.json({ fatal: e.message });
  }
};

module.exports = { getAll, getFromUserId, getById, newPedidoWithGames, updateState };
