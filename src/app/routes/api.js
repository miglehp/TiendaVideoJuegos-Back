const { Router } = require('express');
const gRouter = require('./api/games.api.js');
const uRouter = require('./api/users.api.js');

const router = Router();

const { checkToken } = require('../../helpers/middleware');

router.use('/games', gRouter);
router.use('/users', uRouter);

module.exports = { router };