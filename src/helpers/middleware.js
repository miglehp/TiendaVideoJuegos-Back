const jwt = require('jsonwebtoken');
const User = require('../app/model/user.model');

const checkToken = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.json({ fatal: "Necesitas la cabecera de autenticación: 'authorization'" });
  }

  const token = req.headers['authorization'];

  let obj;
  try {
    obj = jwt.verify(token, 'algo facil');
  } catch (error) {
    return res.json({ fatal: error.message });
  }

  const [arrUser] = await User.getById(obj.userId);

  req.user = arrUser[0];
  req.esAdmin = Boolean(req.user.es_admin);

  next();
};

module.exports = {
  checkToken,
};
