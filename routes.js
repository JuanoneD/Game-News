const express = require('express');
const route = express.Router();

const render = require('./src/controllers/render');
const user = require('./src/controllers/user');
const article = require('./src/controllers/article');


route.get('/', render.pagInicialGet);
route.post('/', user.registerUser);

route.post('/login',user.loginUser);
route.get('/LogOut',user.logout);

route.post('/Update/:id',user.UpdateUser);
route.get('/Update/:id',render.pagUpdate);

route.get('/WriteArticle', home.pagWriteArticle);
route.post('/WriteArticle', article.registerArticle);

module.exports = route;