const articles = require('../model/article');
const users = require('../model/user');
const renders = require('../config/renders');
const fs = require('fs');

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
            login = await users.findByPk(id,{
                raw:true,
                attributes:['IDUser','Name','Password','Email','Admin']
            });
        }

        let article = await articles.findByPk(id_article,{
            raw:true,
            attributes:['IDArticle','Title','Highlight','Content','Description','IDUser']
        });

        if(login.Admin == 0 || login.IDUser != article.IDUser){
            res.redirect(`/${id}`);
            return;
        }
        
        article.Content = fs.readFileSync(`public/articles/${article.Content}`, (err)=>{if(err){console.log(err)}});
        res.render('../views/WriteArticle',{login,error: '',edit:true,article:article});
    }
}