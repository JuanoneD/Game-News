const express = require('express');
const route = express.Router();
const multer = require('multer');
const multerConfig = require('./src/config/multer');

const render = require('./src/controllers/render');
const user = require('./src/controllers/user');
const article = require('./src/controllers/article');
const comment = require('./src/controllers/comment');

route.get('/logout',user.logout);
route.post('/login',user.loginUser);

route.post('/Update/:id',user.UpdateUser);

route.get('/WriteArticle/:user', render.pagWriteArticle);
route.post('/WriteArticle/:user', multer(multerConfig).single('Image'), article.registerArticle);

route.get('/UpdateArticle/:user/:article', render.pagEditArticle);
route.post('/UpdateArticle/:user/:article', multer(multerConfig).single('Image'), article.updateArticle);

route.get('/DeleteArticle/:user/:article', article.deleteArticle);
route.get('/DeleteComment/:user/:comment', comment.deleteComment);

route.get('/articles/:user/:article',render.showArticle);

route.post('/comment/:user/:article',comment.registerComment);



route.post('/', user.registerUser);
route.get('/', render.pagInicialGet);
route.get('/:id',render.pagInicialGet);



module.exports = route;