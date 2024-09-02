const users = require('../model/user');
const articles = require('../model/article');
const fs = require('fs');

module.exports = {
    async registerArticle(req,res){
        let data =  req.body;
        let id_user = req.params.user;
        
        let Img = '';
        if(req.file)
        {
            Img = req.file.filename;
        }

        const fileName = `${new Date().getTime()}-${data.Title}.txt`;
        fs.writeFile("public/articles/" + fileName, data.Content, (err) => {if(err){console.log(err)}});

        await articles.create({
            Title: data.Title,
            Highlight: (data.Highlight == 'on' ? true : false),
            Description: data.Description,
            Image: Img,
            Content: fileName,
            IDUser: id_user
        });
        res.redirect("/" + id_user);
    },
    async updateArticle(req,res){
        let id_user = req.params.user;
        let id_article = req.params.article;
        let data = req.body;

        let article = await articles.findByPk(id_article,{
            raw:true,
            atribues:['IDUser']
        });

        if(article.IDUser != id_user){
            res.redirect('/' + id_user);
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
        
        fs.writeFile("public/articles/" + article.Content, data.Content, (err) => {if(err){console.log(err)}});

        fs.writeFile("public/articles/" + article.Content, data.Content, (err) => {if(err){console.log(err)}});

        await articles.update({
            Title: data.Title,
            Highlight: (data.Highlight == 'on' ? true : false),
            Description: data.Description
        },{where: {IDArticle: id_article }});
        res.redirect('/' + id_user);
    },
    async deleteArticle(req,res){
        let id_user = req.params.user;
        let id_article = req.params.article;

        let article = await articles.findByPk(id_article,{
            raw:true,
            atribues:['IDUser']
        });

        if(article.IDUser != id_user){
            res.redirect('/' + id_user);
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
        res.redirect('/' + id_user);
    }
}