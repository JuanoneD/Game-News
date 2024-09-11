const articles = require('../model/article');
const users = require('../model/user');
const comments = require('../model/comment');
const renders = require('../config/renders');
const methods = require('../model/methods');
const benefits = require('../model/benefits');
const payments = require('../model/payments');
const subscriptions = require('../model/subscriptions');
const fs = require('fs');
const subscriptionsBenefits = require('../model/subscriptionsBenefits');
const { Op, col, where } = require('sequelize');
const { raw } = require('express');
const { start } = require('repl');
const Methods = require('../model/methods');
const { name } = require('ejs');
const likes = require('../model/likes');
const { count } = require('console');

module.exports = {
    async pagInicialGet(req, res){
        let id = req.session.IDUser;
        let login = null;
        if(id){
            login = await users.findByPk(id,{
                raw:true,
                attributes:['IDUser','Name','Password','Email','Admin']
            });
        }
        renders.renderIndex(res,null,login);
    },
    async pagWriteArticle(req,res){
        let id = req.session.IDUser;
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
        
        let benefit = await benefits.findAll({
            raw:true,
            atributtes:['IDBenefit','Description']
        });

        res.render('../views/WriteArticle',{login,error: '',edit:false,article:null,benefits:benefit});
    },
    async pagEditArticle(req,res){
        let id_user = req.session.IDUser;
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
            attributes:['IDArticle','Title','Highlight','Content','Description','IDUser','IDBenefit']
        });

        if(login.Admin == 0 || login.IDUser != article.IDUser){
            res.redirect(`/${id_user}`);
            return;
        }

        let benefit = await benefits.findAll({
            raw:true,
            atributtes:['IDBenefit','Description']
        });
        
        article.Content = fs.readFileSync(`public/articles/${article.Content}`, (err)=>{if(err){console.log(err)}});
        res.render('../views/WriteArticle',{login,error: '',edit:true,article:article,benefits:benefit});
    },
    async showArticle(req,res){
        let id_user = req.session.IDUser;
        let id_article = req.params.article;

        if(!id_user){id_user = 0;}

        let login = await users.findByPk(id_user,{
            raw:true,
            attributes:['IDUser','Name','Password','Email','Admin']
        })

        let article = await articles.findByPk(id_article,{
            raw:true,
            attributes:['IDArticle','Title','Highlight','Content','Description','IDUser','Image','createdAt','updatedAt', 'User.Name','IDBenefit'],
            include:{
                model:users
            },
        })

        let UserSub = await payments.findAll
        (
            {
                raw: true,
                include: 
                {
                    model: subscriptions, 
                    required: true, 
                    include: 
                    {
                        model: benefits, 
                        required: true, 
                        where: {IDBenefit: article.IDBenefit}
                    }
                },
                attributes: ['IDPayment','StartDate','EndDate'],
                where:
                {
                    IDUser: id_user
                }
            }
        );

        if(article.IDBenefit)
        {
            if(!login)
            {
                renders.renderIndex(res,null,null,'Faça Login Para Ver esse Artigo');
                return;
            }
            if(!login.Admin)
            {
                UserSub = UserSub.map((item)=>{
                    if(Date.now() >= new Date(item.StartDate).getTime() && Date.now() <= new Date(item.EndDate).getTime())
                        {
                            return item;
                        }
                    });
                    
                    let HasBenefit = false;
                    for(let i = 0; i < UserSub.length; ++i)
                    {
                        if(UserSub[i])
                        {
                            HasBenefit = true;
                        }
                    }
                    if(!HasBenefit)
                    {
                        renders.renderIndex(res,null,login,`Este artigo é barrado por uma assinatura`);
                        return;
                    }
                }
        }

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

        let num_likes = await likes.count({where:{IDArticle:id_article}});

        let this_like = await likes.findOne({where:{IDArticle:id_article,IDUser:id_user}});

        article.Content = fs.readFileSync(`public/articles/${article.Content}`, (err)=>{if(err){console.log(err)}});

        res.render('../views/ShowArticle',{login,article,error:null,message:null,comment,num_likes,this_like: this_like?true:false});
    },
    async pagAdmPage(req,res){
        let id = req.session.IDUser;
        let login = await users.findByPk(id,{
            raw:true,
            attributes:['IDUser','Name','Password','Email','Admin']
        })
        if(!login){
            res.redirect(`/`);
            return;
        }
        if(login.Admin == 0){
            res.redirect(`/`);
            return;
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
            attributes:['IDSubscription','Description','Price']
        });

        const AllInfo = await Promise.all(subscription.map(async (subscrip)=>{
            const listBenefits  = await subscriptionsBenefits.findAll({
                raw:true,
                attributes:['BenefitIDBenefit','IDSubscriptionsBenefits'],
                where : {SubscriptionIDSubscription: subscrip.IDSubscription}
            });

            let listName = await Promise.all(listBenefits.map(async(bene)=>{
                const allIn = await benefits.findByPk(bene.BenefitIDBenefit,{
                    raw:true
                })
                return{...bene,nameBenefits:allIn.Description}
            }))
            return{...subscrip,listBenefits:listName};
        }));

        let payment = await payments.findAll({
            raw:true,
            attributes:[
                'IDPayment',
                'StartDate',
                'EndDate',
                'Value',
                [col('User.Name'),'Name'],
                [col('Method.Description'),'MethodDescription'],
                [col('Subscription.Description'),'SubDescription'],
            ],
            include:[
               { model: subscriptions},{model:Methods},
               {
                model:users,
                where:(req.body.SearchByName?{'Name':{[Op.like]:`%${req.body.SearchByName}%`}}:{})
               }
            ],
            order:[['createdAt','DESC']],
            limit: 10
        })

        let all_users = await users.findAll({
            raw:true,
            where:(req.body.SearchByNameUser?{'Name':{[Op.like]:`%${req.body.SearchByNameUser}%`}}:{})
        })

        console.log(req.body.SearchByName)
        console.log(req.body.SearchByNameUser)

        res.render('../views/AdmPage',{login,error:null,message:null,methods:method,benefits:benefit,subscriptions:AllInfo,payments:payment,all_users});
    },
    async pagSubscriptions(req, res)
    {
        let id_user = req.session.IDUser;

        let login = await users.findByPk(id_user,{
            raw:true,
            attributes:['IDUser','Name','Password','Email','Admin']
        })

        let CurrentSub = await payments.findAll
        (
            {
                raw: true,
                include: [{model: users, required: true}, {model: subscriptions, required: true}],
                attributes: ["IDSubscription","StartDate","EndDate"],
                where: {IDUser: id_user}
            }
        );
        
        console.log(CurrentSub);
        CurrentSub = CurrentSub.map((item)=>{
            if(Date.now() >= new Date(item.StartDate).getTime() && Date.now() <= new Date(item.EndDate).getTime())
            {
                return item.IDSubscription;
            }
        });

        console.log(CurrentSub);

        let Subs = await subscriptions.findAll(
            {
                raw: true,
                attributes: ["IDSubscription","Description","Price"]
            }
        );

        Subs = await Promise.all(Subs.map(async (Sub)=>
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

            return {...Sub,Benefits:[...Benefits]};
        }))

        let Methods = await methods.findAll({raw:true, attributes: ['IDMethod','Description']})

        res.render('../views/Subscriptions', {CurrentSub,Subs,login,Methods});
    }
}