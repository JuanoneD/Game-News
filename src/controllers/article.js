const users = require('../model/user');
const articles = require('../model/article');
const fs = require('fs');
const Comments = require('../model/comment');

module.exports = {
    async registerArticle(req,res){
        let data =  req.body;
        let id_user = req.session.IDUser;

        console.log(data);
        
        let Img = '';
        if(req.file)
        {
            Img = req.file.filename;
        }

        const fileName = `${new Date().getTime()}-${String(data.Title).replace(/[?\/\\:*<>"|]/g, "")}.txt`;
        fs.writeFile("public/articles/" + fileName, data.Content, (err) => {if(err){console.log(err)}});

        await articles.create({
            Title: data.Title,
            Highlight: (data.Highlight == 'on' ? true : false),
            Description: String(data.Description).replace(/[\n\r]/g, ""),
            Image: Img,
            Content: fileName,
            IDUser: id_user,
            IDBenefit: (data.IDBenefit==0?null:data.IDBenefit)
        });
        res.redirect("/");
    },
    async updateArticle(req,res){
        let id_user = req.session.IDUser;
        let id_article = req.params.article;
        let data = req.body;

        let article = await articles.findByPk(id_article,{
            raw:true,
            atribues:['IDArticle','IDUser','Content','Title']
        });

        if(article.IDUser != id_user){
            res.redirect('/');
            return;
        }

        if(req.file)
        {
            const Img = await articles.findByPk
            (
                id_article,
                {
                    raw: true,
                    attributes: ['Image']
                }
            );
            fs.unlink(`public/img/${Img.Image}`,(err) => {if(err){console.log(err);}});
            await articles.update
            (
                {
                    Image: req.file.filename
                },
                {
                    where: {IDArticle: id_article}
                }
            );
        }

        if(data.Title != article.Title)
        {
            fs.unlink("public/articles/" + article.Content, (err) => {if(err){console.log(err)}})
            article.Content = `${new Date().getTime()}-${String(data.Title).replace(/[?\/\\:*<>"|]/g, "")}.txt`;
        }
        
        fs.writeFile("public/articles/" + article.Content, data.Content, (err) => {if(err){console.log(err)}});

        await articles.update({
            Title: data.Title,
            Highlight: (data.Highlight == 'on' ? true : false),
            Description: String(data.Description).replace(/[\n\r]/g, ""),
            Content: article.Content,
            IDBenefit:(data.IDBenefit==0?null:data.IDBenefit)
        },{where: {IDArticle: id_article }});
        res.redirect('/');
    },
    async deleteArticle(req,res){
        let id_user = req.session.IDUser;
        let id_article = req.params.article;

        let article = await articles.findByPk(id_article,{
            raw:true,
            atribues:['IDUser']
        });

        if(article.IDUser != id_user){
            res.redirect('/');
            return;
        }

        const Img = await articles.findByPk
        (
            id_article,
            {
                raw: true,
                attributes: ['Image']
            }
        );
        fs.unlink(`public/img/${Img.Image}`,(err) => {if(err){console.log(err);}});

        await articles.destroy({where:{IDArticle : id_article}});
        await Comments.destroy({where:{IDArticle : id_article}});
        res.redirect('/');
    }
}