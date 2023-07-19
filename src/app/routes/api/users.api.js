const { Router } = require('express');
const usersController = require('../../controller/user.controller');

const uRouter = Router();



uRouter.post('/register', usersController.create);
uRouter.post('/login', usersController.checkLogin);
uRouter.put('/:userId', usersController.update);

module.exports = uRouter;