const { Router } = require('express');
const usersController = require('../../controller/user.controller');

const uRouter = Router();




uRouter.post('/', usersController.create);
uRouter.put('/:userId', usersController.update);

module.exports = uRouter;