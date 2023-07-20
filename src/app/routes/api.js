const { Router } = require('express');
const gRouter = require('./api/games.api');
const uRouter = require('./api/users.api');
const sRouter = require('./api/screenshots.api');

const router = Router();

const { checkToken } = require('../../helpers/middleware');

router.use('/games', gRouter);
router.use('/users', uRouter);
router.use('/screenshots', sRouter);

module.exports = { router };