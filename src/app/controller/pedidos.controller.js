const pedidosModel = require('../model/pedidos.model');

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
      const [pedidos] = await pedidosModel.getById(req.params.pedidoId);
      res.json({
        message: `Detalles del pedido: ${req.params.pedidoId}`,
        pedidos: pedidos,
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



module.exports = { getAll, getFromUserId, getById };
