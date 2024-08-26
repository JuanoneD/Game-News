const express = require('express');
const route = express.Router();

const home = require('./src/controllers/home');

route.get('/', home.pagInicialGet);
module.exports = route;