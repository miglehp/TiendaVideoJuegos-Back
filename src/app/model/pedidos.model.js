const db = require('../../config/db');

const get = () => db.query('SELECT * FROM ecomercedb.pedidos;');

const getFromUserId = (id) => db.query('SELECT * FROM pedidos WHERE users_id = ?;', [id]);

const getById = (id) => db.query('SELECT * FROM pedidos WHERE id = ?;', [id]);

const newPedido = (userId) => db.query('INSERT INTO pedidos (users_id) VALUES (?)', [userId]);

const newGameForPedido = (pedidoId, gameId) => db.query('INSERT INTO pedidos_has_games (pedidos_id, games_id) VALUES (?, ?);', [pedidoId, gameId]);

module.exports = { get, getFromUserId, getById, newPedido, newGameForPedido };
