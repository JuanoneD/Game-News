const users = require('../model/user');
const articles = require('../model/article');
const fs = require('fs');

module.exports = {
    async registerArticle(req,res){
        let data =  req.body;
        let id_user = req.params.id;
        if(!id_user){return;}
        
        const fileName = `${new Date().getTime()}-${data.Title}.txt`;

        fs.writeFile("../../public/articles/" + fileName, data.Content, (err) => {console.log("Erro ao escrever arquivo")});
        /*
        await articles.create({
            Title: data.Title,
            Highlight:data.Highlight,
            Image: data.Image,
            Content: data.Content,
            IDUser: id_user
        });
        */
    },
    async updateArticle(req,res){
        let id_user = req.params.id;
        let id_article = req.params.idArticle;

        let article= await articles.findByPk(id_article,{
            raw:true,
            atribues:['Title','Highlight','Image','Content','IDUser']
        });

        if(article.IDUser != id_user){
            res.redirect('/',{error: 'NoPermission'});
            return;
        }

        await articles.update({
            Title: data.Title,
            Highlight:data.Highlight,
            Image: data.Image,
            Content: data.Content
        },{where: {IDArticle: id_article }});
    },
    async deleteArticle(req,res){
        let id_user = req.params.id;
        let id_article = req.params.idArticle;

        let article=  await articles.findByPk(id_article,{
            raw:true,
            atribues:['Title','Highlight','Image','Content','IDUser']
        });

        if(article.IDUser != id_user){
            res.redirect('/',{error: 'NoPermission'});
            return;
        }
        await articles.destroy({where:{IDArticle : id_article}});
    }
    
}