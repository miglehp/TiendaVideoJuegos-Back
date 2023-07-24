const pedidosModel = require('../model/pedidos.model');

const getAll = async (req, res) => {
  try {
    const [pedidos] = await pedidosModel.get();
    res.json(pedidos);
  } catch (e) {
    res.json({ error: e });
  }
};

module.exports = { getAll };
