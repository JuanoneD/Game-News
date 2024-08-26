const express = require('express');
const route = express.Router();

const home = require('./src/controllers/home');
const user = require('./src/controllers/user')

route.get('/', home.pagInicialGet);
route.post('/', user.registerUser);
route.post('/login',user.loginUser);
module.exports = route;