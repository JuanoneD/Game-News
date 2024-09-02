const express = require('express');
const route = express.Router();
const multer = require('multer');
const multerConfig = require('./src/config/multer');

const render = require('./src/controllers/render');
const user = require('./src/controllers/user');
const article = require('./src/controllers/article');
const comment = require('./src/controllers/comment');
const methods = require('./src/controllers/methods');
const subscriptions = require('./src/controllers/subscription');
const benefits = require('./src/controllers/benefits');
const subscriptionsBenefits = require('./src/controllers/subscriptionsBenefits');

route.get('/logout',user.logout);
route.post('/login',user.loginUser);

route.post('/Update/:id',user.UpdateUser);

route.get('/WriteArticle/:user', render.pagWriteArticle);
route.post('/WriteArticle/:user', multer(multerConfig).single('Image'), article.registerArticle);

route.get('/UpdateArticle/:user/:article', render.pagEditArticle);
route.post('/UpdateArticle/:user/:article', multer(multerConfig).single('Image'), article.updateArticle);

route.get('/DeleteArticle/:user/:article', article.deleteArticle);

route.get('/articles/:user/:article',render.showArticle);

route.post('/comment/:user/:article',comment.registerComment);

route.get('/AdmPage/:user',render.pagAdmPage);
route.post('/InsertMethod/:user',methods.InsertMethods);
route.post('/InsertSub/:user',subscriptions.insertSubs);
route.post('/InsertBenefit/:user',benefits.insertBenefits);
route.post('/InsertSubBenefit/:user/:sub',subscriptionsBenefits.insertSubsBenefits);



route.post('/', user.registerUser);
route.get('/', render.pagInicialGet);
route.get('/:id',render.pagInicialGet);



module.exports = route;