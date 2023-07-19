const jwt = require('jsonwebtoken');

const Game = require('../app/model/games.model');
const User = require('../app/model/user.model');

const checkToken = (req, res, next) => {

    if(!req.headers['authorization']){
        return res.json({fatal: 'Necesitas la cabecera de autenticación'});
    }

    const token = req.headers['authorization'];

    jwt.verify(token, 'algo facil');

    next();
}

module.exports = {
    checkToken
}