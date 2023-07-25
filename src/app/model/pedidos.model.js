const db = require('../../config/db');

const get = () => db.query('SELECT * FROM ecomercedb.pedidos;');

const getFromUserId = (id) => db.query('SELECT * FROM pedidos WHERE users_id = ?;', [id]);

const getById = (id) => db.query('SELECT * FROM pedidos WHERE id = ?;', [id]);

const newPedido = () => db.query();

module.exports = { get, getFromUserId, getById };
