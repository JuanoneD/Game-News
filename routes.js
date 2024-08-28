const express = require('express');
const route = express.Router();

const render = require('./src/controllers/render');
const user = require('./src/controllers/user');

route.get('/', render.pagInicialGet);
route.post('/', user.registerUser);

route.post('/login',user.loginUser);
route.get('/LogOut',user.logout);

route.post('/Update/:id',user.UpdateUser);
route.get('/Update/:id',render.pagUpdate);

module.exports = route;