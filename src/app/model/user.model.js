const db = require('../../config/db');

const insert = ({ username, password, email, fecha_nacimiento }) => {
  return db.query('insert into users (username, password, email, fecha_nacimiento) values (?, ?, ?, ?)', [username, password, email, fecha_nacimiento]);
};

const updateById = (userId, { username, password, email, active, fecha_nacimiento, foto_perfil_url, validado }) => {
  return db.query('update users set username = ?, password = ?, email = ?, active = ?, fecha_nacimiento = ?, foto_perfil_url = ?, validado = ? where id = ?', [
    username,
    password,
    email,
    active,
    fecha_nacimiento,
    foto_perfil_url,
    validado,
    userId,
  ]);
};

const getById = (userId) => {
  return db.query('select * from users where id = ?', [userId]);
};

const getByEmail = (email) => {
  return db.query('select * from users where email = ?', [email]);
};

module.exports = {
  insert,
  getById,
  updateById,
  getByEmail,
};
