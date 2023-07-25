//const nodemailer = require('nodemailer');
const { Router } = require('express');
const gRouter = require('./api/games.api.js');
const uRouter = require('./api/users.api.js');
const sRouter = require('./api/screenshots.api');
const pRouter = require('./api/pedidos.api');
const { checkToken } = require('../../helpers/middleware');

const router = Router();


/* const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'spotiGame0523@gmail.com',
        pass: 'Mayo0523'
    }
}) */

router.use('/games', gRouter);
router.use('/users', uRouter);
router.use('/screenshots', sRouter);
router.use('/pedidos', checkToken, pRouter);

module.exports = { router };
