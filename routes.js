const express = require('express');
const route = express.Router();

const home = require('./src/controllers/home');
const user = require('./src/controllers/user')
const errors = require('./src/controllers/errors');

route.get('/', home.pagInicialGet);
route.post('/', user.registerUser);
route.post('/login',user.loginUser);

route.get('/loginError',errors.LoginError);
module.exports = route;