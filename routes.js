const express = require('express');
const route = express.Router();
const multer = require('multer');
const multerConfig = require('./src/config/multer');

const render = require('./src/controllers/render');
const user = require('./src/controllers/user');
const article = require('./src/controllers/article');


route.get('/', render.pagInicialGet);
route.post('/', user.registerUser);

route.post('/login',user.loginUser);
route.get('/LogOut',user.logout);

route.post('/Update/:id',user.UpdateUser);
route.get('/Update/:id',render.pagUpdate);

route.get('/WriteArticle/:user', render.pagWriteArticle);
route.post('/WriteArticle/:user', multer(multerConfig).single('Image'), article.registerArticle);

module.exports = route;