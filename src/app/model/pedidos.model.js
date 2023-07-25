const db = require('../../config/db');

const get = () => db.query('SELECT * FROM ecomercedb.pedidos;');

module.exports = { get };
