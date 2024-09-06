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

route.post('/Update',user.UpdateUser);

route.get('/WriteArticle', render.pagWriteArticle);
route.post('/WriteArticle', multer(multerConfig).single('Image'), article.registerArticle);

route.get('/UpdateArticle/:article', render.pagEditArticle);
route.post('/UpdateArticle/:article', multer(multerConfig).single('Image'), article.updateArticle);

route.get('/DeleteArticle/:article', article.deleteArticle);
route.get('/DeleteComment/:comment', comment.deleteComment);


route.get('/Subscriptions', render.pagSubscriptions);

route.post('/InsertPayment/:subscription', payments.InsertPayment);

route.get('/articles/:article',render.showArticle);

route.post('/comment/:article',comment.registerComment);
route.post('/UpdateComment/:comment',comment.updateComment);

route.get('/AdmPage',render.pagAdmPage);
route.post('/AdmPage',render.pagAdmPage);
route.post('/InsertMethod',methods.InsertMethods);
route.get('/DeleteMethod/:method',methods.DeleteMethods)
route.post('/UpdateMethod/:method',methods.UpdateMethods)
route.post('/InsertSub',subscriptions.insertSubs);
route.get('/DeleteSubscription/:subs',subscriptions.DeleteSubs);
route.post('/UpdateSubs/:subs',subscriptions.UpdateSubs);
route.post('/InsertBenefit',benefits.insertBenefits);
route.post('/UpdateBenefits/:benefit',benefits.UpdateBenefits);
route.get('/DeleteBenefit/:benefit',benefits.DeleteBenefits);
route.post('/InsertSubBenefit/:sub',subscriptionsBenefits.insertSubsBenefits);
route.post('/DeleteRelation',subscriptionsBenefits.DeleteRelation);



route.post('/', user.registerUser);
route.get('/', render.pagInicialGet);

module.exports = route;