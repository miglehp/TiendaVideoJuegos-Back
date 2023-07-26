const { Router } = require('express');
const screenshotsController = require('../../controller/screenshots.controller.js');

const sRouter = Router();

sRouter.get('/:gameId', screenshotsController.getAllScreenshotsFromGameId);

module.exports = sRouter;
