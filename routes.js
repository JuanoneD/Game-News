const express = require('express');
const route = express.Router();
const multer = require('multer');
const multerConfig = require('./src/config/multer');

const render = require('./src/controllers/render');
const user = require('./src/controllers/user');
const article = require('./src/controllers/article');


route.get('/Logout',user.logout);
route.get('/', render.pagInicialGet);
route.get('/:id',render.pagInicialGet);

route.post('/', user.registerUser);

route.post('/login',user.loginUser);

route.post('/Update/:id',user.UpdateUser);


route.get('/WriteArticle/:user', render.pagWriteArticle);
route.post('/WriteArticle/:user', multer(multerConfig).single('Image'), article.registerArticle);

module.exports = route;