const { raw } = require('express');
const Likes = require('../model/likes');
const { where } = require('sequelize');

module.exports ={
    async registerLike(req,res){
        let id_user = req.session.IDUser;
        let id_article = req.params.article;

        let verify_like = await Likes.findOne({
            raw:true,
            where:{IDUser:id_user,IDArticle:id_article}
        });
    
        if(verify_like){
            res.redirect(`/Articles/${id_article}`);
            return;
        }

        await Likes.create({
            IDUser: id_user,
            IDArticle: id_article
        })
        res.redirect(`/Articles/${id_article}`);
    },
    async deleteLike(req,res){
        let id_user = req.session.IDUser;
        let id_article = req.params.article;
        await Likes.destroy({where:{IDUser:id_user,IDArticle:id_article}});
        res.redirect(`/Articles/${id_article}`);
    }
}