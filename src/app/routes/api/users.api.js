const { Router } = require('express');
const usersController = require('../../controller/user.controller');
const { checkToken } = require('../../../helpers/middleware');

const uRouter = Router();

uRouter.post('/register', usersController.create);
uRouter.post('/login', usersController.checkLogin);
uRouter.put('/:userId', checkToken, usersController.update);

module.exports = uRouter;
