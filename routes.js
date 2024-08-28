const express = require('express');
const route = express.Router();

const home = require('./src/controllers/home');
const user = require('./src/controllers/user');
const article = require('./src/controllers/article');


route.get('/', home.pagInicialGet);
route.post('/', user.registerUser);

route.post('/login',user.loginUser);
route.get('/LogOut',user.logout);

route.post('/Update/:id',user.UpdateUser);
route.get('/Update/:id',home.pagUpdate);

route.get('/WriteArticle', home.pagWriteArticle);
route.post('/WriteArticle', article.registerArticle);

module.exports = route;