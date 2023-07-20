const { Router } = require('express'); 
const nodemailer = require('nodemailer');
const gRouter = require('./api/games.api.js');
const uRouter = require('./api/users.api.js');

const router = Router();

const { checkToken } = require('../../helpers/middleware');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'spotiGame0523@gmail.com',
        pass: 'Mayo0523'
    }
})



router.use('/games', gRouter);
router.use('/users', uRouter);

module.exports = { router };