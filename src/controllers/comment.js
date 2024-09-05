const users = require('../model/user');
const comments = require('../model/comment');

module.exports = {
    async registerComment(req,res){
        let id_user = req.session.IDUser;
        let id_article = req.params.article;

        let data = req.body;


        await comments.create({
            Description: data.Description,
            IDUser: id_user,
            IDArticle: id_article
        });
        res.redirect(`/Articles/${id_article}`); /// change to the link for articles
    },
    async updateComment(req,res){
        let id_user = req.session.IDUser;
        let id_comment = req.params.comment;
        let data = req.body;

        
        let comment = await comments.findByPk(id_comment,{
            raw:true,
            atributes:['Description','IDUser','IDArticle']
        });
        
        let user = await users.findByPk(id_user,{
            raw:true,
            atributes:['Admin']
        })

        if(!comment || !user){
            res.redirect(`/`); /// change to the link for articles
            return;
        }
        
        if(comment.IDUser != id_user){
            res.redirect(`/Articles/${comment.IDArticle}`); /// change to the link for articles
            return;
        }
        
        await comments.update({
            Description: data.Description
        },{where:{IDComment: id_comment}});
        res.redirect(`/Articles/${comment.IDArticle}`); /// change to the link for articles
    },
    async deleteComment(req,res){
        let id_user = req.session.IDUser;
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
            res.redirect(`/`); /// change to the link for articles
            return;
        }
        
        if(!(comment.IDUser == id_user || user.Admin == 1)){
            res.redirect(`/Articles/${comment.IDArticle}`); /// change to the link for articles
            return;
        }
        
        await comments.destroy({where:{IDComment: id_comment}});
        res.redirect(`/Articles/${comment.IDArticle}`); /// change to the link for articles
    } 
}