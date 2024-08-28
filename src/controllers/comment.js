const users = require('../model/user');
const comments = require('../model/comment');
const { raw } = require('express');
const { where } = require('sequelize');

module.exports = {
    async registerComment(req,res){
        let id_user = req.params.id;
        let id_artice = req.params.idArticle;

        let data = req.body;

        await comments.create({
            Description: data.Description,
            IDUser: id_user,
            idArticle: id_artice
        });
        res.redirect(`/Articles/${id_user}/${id_artice}`); /// chage to the link for articles
    },
    async updateComment(req,res){
        let id_user = req.params.id;
        let id_comment = req.params.comment;
        let data = req.body;
        
        let comment = await comments.findByPk(id_comment,{
            raw:true,
            atributes:['Description','IDUser','idArticle']
        });
        
        let user = await users.findByPk(id_user,{
            raw:true,
            atributes:['Admin']
        })

        if(!comment || !user){
            res.redirect(`/`,{error:'NoPermission'}); /// chage to the link for articles
            return;
        }
        
        if(comment.IDUser != id_user || user.Admin != 1){
            res.redirect(`/Articles/${id_artice}`,{error:'NoPermission'}); /// chage to the link for articles
            return;
        }
        
        await comments.update({
            Description: data.Description
        },{where:{IDComment: id_comment}});
        res.redirect(`/Articles/${id_user}/${comment.IDArticle}`); /// chage to the link for articles
    },
    async deleteComment(req,res){
        let id_user = req.params.id;
        let id_comment = req.params.comment;
        
        let comment = await comments.findByPk(id_comment,{
            raw:true,
            atributes:['Description','IDUser','IDArticle']
        });
        
        let user = await users.findByPk(id_user,{
            raw:true,
            atributes:['Admin']
        })

        if(!comment || !user){
            res.redirect(`/`,{error:'NoPermission'}); /// chage to the link for articles
            return;
        }
        
        if(comment.IDUser != id_user || user.Admin != 1){
            res.redirect(`/Articles/${id_user}/${comment.IDArticle}`,{error:'NoPermission'}); /// chage to the link for articles
            return;
        }
        
        await comments.destroy({where:{IDComment: id_comment}});
        res.redirect(`/Articles/${id_user}/${comment.IDArticle}`); /// chage to the link for articles
    } 
}