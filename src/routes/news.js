const express = require('express');
const route = express.Router();


const newsController = require('../app/controlllers/NewsController');

route.use('/:slug', newsController.show);
route.use('/', newsController.index);

module.exports = route;