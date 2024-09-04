const express = require('express');
const route = express.Router();
const multer = require('multer');
const multerConfig = require('./src/config/multer');

const render = require('./src/controllers/render');
const user = require('./src/controllers/user');
const article = require('./src/controllers/article');
const comment = require('./src/controllers/comment');
const methods = require('./src/controllers/methods');
const payments = require('./src/controllers/payments');
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
route.get('/DeleteComment/:user/:comment', comment.deleteComment);

route.get('/articles/:user/:article',render.showArticle);

route.post('/comment/:user/:article',comment.registerComment);
route.post('/UpdateComment/:id/:comment',comment.updateComment);

route.get('/AdmPage/:user',render.pagAdmPage);
route.post('/InsertMethod/:user',methods.InsertMethods);
route.get('/DeleteMethod/:user/:method',methods.DeleteMethods)
route.post('/UpdateMethod/:user/:method',methods.UpdateMethods)
route.post('/InsertSub/:user',subscriptions.insertSubs);
route.get('/DeleteSubscription/:user/:subs',subscriptions.DeleteSubs);
route.post('/UpdateSubs/:user/:subs',subscriptions.UpdateSubs);
route.post('/InsertBenefit/:user',benefits.insertBenefits);
route.post('/UpdateBenefics/:user/:benefit',benefits.UpdateBenefits);
route.get('/DeleteBenefit/:user/:benefit',benefits.DeleteBenefits);
route.post('/InsertSubBenefit/:user/:sub',subscriptionsBenefits.insertSubsBenefits);



route.post('/', user.registerUser);
route.get('/', render.pagInicialGet);
route.get('/:id',render.pagInicialGet);



module.exports = route;