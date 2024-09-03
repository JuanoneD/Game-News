const articles = require('../model/article');
const users = require('../model/user');
const comments = require('../model/comment');
const renders = require('../config/renders');
const methods = require('../model/methods');
const benefits = require('../model/benefits');
const payments = require('../model/payments');
const subscriptions = require('../model/subscriptions');
const fs = require('fs');
const Benefits = require('../model/benefits');
const subscriptionsBenefits = require('../model/subscriptionsBenefits');
const { Op } = require('sequelize')

module.exports = {
    async pagInicialGet(req, res){
        let id = req.params.id;
        let login = null;
        console.log(id);
        if(Number(id)){
            login = await users.findByPk(id,{
                raw:true,
                attributes:['IDUser','Name','Password','Email','Admin']
            });
        }
        console.log(login);
        renders.renderIndex(res,null,login);
    },
    async pagWriteArticle(req,res){
        let id = req.params.user;
        let login = null;
        if(Number(id)){
            login = await users.findByPk(id,{
                raw:true,
                attributes:['IDUser','Name','Password','Email','Admin']
            });
        }
        if(login.Admin == 0){
            res.redirect(`/${id}`);
            return;
        }
        res.render('../views/WriteArticle',{login,error: '',edit:false,article:null});
    },
    async pagEditArticle(req,res){
        let id_user = req.params.user;
        let id_article = req.params.article;
        let login = null;

        if(Number(id_user)){
            login = await users.findByPk(id_user,{
                raw:true,
                attributes:['IDUser','Name','Password','Email','Admin']
            });
        }

        let article = await articles.findByPk(id_article,{
            raw:true,
            attributes:['IDArticle','Title','Highlight','Content','Description','IDUser']
        });

        if(login.Admin == 0 || login.IDUser != article.IDUser){
            res.redirect(`/${id_user}`);
            return;
        }
        
        article.Content = fs.readFileSync(`public/articles/${article.Content}`, (err)=>{if(err){console.log(err)}});
        res.render('../views/WriteArticle',{login,error: '',edit:true,article:article});
    },
    async showArticle(req,res){
        let id_user = req.params.user;
        let id_article = req.params.article;

        let login = await users.findByPk(id_user,{
            raw:true,
            attributes:['IDUser','Name','Password','Email','Admin']
        })

        let article = await articles.findByPk(id_article,{
            raw:true,
            attributes:['IDArticle','Title','Highlight','Content','Description','IDUser','Image','createdAt','updatedAt', 'User.Name'],
            include:{
                model:users
            },
        })

        let comment = await comments.findAll({
            raw:true,
            attributes:['IDComment','Description','User.Name','IDUser','createdAt','updatedAt'],
            include:{
                model:users
            },
            where:{'IDArticle':id_article}
        });

        article.createdAt = new Date(article.createdAt).toLocaleString('pt-BR');
        article.updatedAt = new Date(article.updatedAt).toLocaleString('pt-BR');

        comment.forEach((item) =>{
            item.createdAt = new Date(item.createdAt).toLocaleString('pt-BR');
            item.updatedAt = new Date(item.updatedAt).toLocaleString('pt-BR');
        })

        article.Content = fs.readFileSync(`public/articles/${article.Content}`, (err)=>{if(err){console.log(err)}});

        res.render('../views/ShowArticle',{login,article,error:null,message:null,comment});
    },
    async pagAdmPage(req,res){
        let id = req.params.user;
        let login = await users.findByPk(id,{
            raw:true,
            attributes:['IDUser','Name','Password','Email','Admin']
        })
        if(login.Admin == 0){
            res.redirect(`/${login.IDUser}`);
            return
        }

        let method = await methods.findAll({
            raw:true,
            attributes:['IDMethod','Description']
        });

        let benefit = await benefits.findAll({
            raw:true,
            attributes:['IDBenefit','Description']
        });

        let subscription = await subscriptions.findAll({
            raw:true,
            attributes:['IDSubscription','Description']
        });

        // await subscription.forEach(async (sub,index) => {            
        //     let listBenefits = await subscriptionsBenefits.findAll({
        //         raw:true,
        //         attributes:['IDBenefit'],
        //         where:{'SubscriptionIDSubscription':sub.IDSubscription}
        //     });
        //     subscription[index].listBenefits = listBenefits;
        // })

        const AllInfo = await Promise.all(subscription.map(async (subscrip)=>{
            const listBenefits = await subscriptionsBenefits.findAll({
                raw:true,
                attributes:['IDBenefit'],
                where : {SubscriptionIDSubscription: subscrip.IDSubscription}
            });
            return{...subscrip,listBenefits};
        }));

        res.render('../views/AdmPage',{login,error:null,message:null,methods:method,benefits:benefit,subscriptions:AllInfo});
    },
    async pagSubscriptions(req, res)
    {
        let id_user = req.params.user;
        let CurrentSub = await payments.findAll
        (
            {
                raw: true,
                include: [users, subscriptions],
                attributes: ["IDSubscription"],
                where: {IDUser: id_user}
            }
        );

        let Subs = await subscriptions.findAll(
            {
                raw: true,
                attributes: ["IDSubscription","Description","Price"]
            }
        );

        let Res = await Promise.all(Subs.map(async (Sub)=>
        {
            let SubsBen = await subscriptionsBenefits.findAll(
                {
                    raw: true,
                    attributes: ["BenefitIDBenefit"],
                    where: {SubscriptionIDSubscription: Sub.IDSubscription}
                }
            )

            let Benefits = await benefits.findAll(
                {
                    raw: true,
                    attributes: ["IDBenefit", "Description"],
                    where: {IDBenefit: {[Op.in]: SubsBen.map((item)=>{return item.BenefitIDBenefit;})}}
                }
            )

            return {...Sub,Benefits};
        }))
        
        console.log(Res)
        res.redirect('back');
    }
}