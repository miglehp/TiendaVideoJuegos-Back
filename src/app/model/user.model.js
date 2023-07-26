const db = require('../../config/db');

const getUsers = () => {
  return db.query('select * from users');
};

const insert = ({ username, password, email, fecha_nacimiento }) => {
  return db.query('insert into users (username, password, email, fecha_nacimiento) values (?, ?, ?, ?)', [username, password, email, fecha_nacimiento]);
};

const updateById = (userId, { username, password, email, active, fecha_nacimiento }) => {
  const fechaFormateada = fecha_nacimiento ? fecha_nacimiento.split('-').join('-') : null;

  const fieldsToUpdate = [];
  const valuesToUpdate = [];

  if (username !== undefined) {
    fieldsToUpdate.push('username = ?');
    valuesToUpdate.push(username);
  }
  if (password !== undefined) {
    fieldsToUpdate.push('password = ?');
    valuesToUpdate.push(password);
  }
  if (email !== undefined) {
    fieldsToUpdate.push('email = ?');
    valuesToUpdate.push(email);
  }
  if (active !== undefined) {
    fieldsToUpdate.push('active = ?');
    valuesToUpdate.push(active);
  }
  if (fechaFormateada !== undefined) {
    fieldsToUpdate.push('fecha_nacimiento = ?');
    valuesToUpdate.push(fechaFormateada);
  }
  if (fieldsToUpdate.length === 0) {
    return Promise.reject(new Error('Nada para actualizar.'));
  }

  const sql = `
    UPDATE users
    SET ${fieldsToUpdate.join(', ')}
    WHERE id = ?;
  `;

  valuesToUpdate.push(userId);

  return db.query(sql, valuesToUpdate);
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
  getUsers,
};
