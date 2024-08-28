const express = require('express');
const route = express.Router();

const home = require('./src/controllers/home');
const user = require('./src/controllers/user');

route.get('/', home.pagInicialGet);
route.post('/', user.registerUser);

route.post('/login',user.loginUser);
route.get('/LogOut',user.logout);

route.post('/Update/:id',user.UpdateUser);
route.get('/Update/:id',home.pagUpdate);

module.exports = route;