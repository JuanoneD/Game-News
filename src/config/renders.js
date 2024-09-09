const { raw } = require('express');
const Article = require('../model/article');
const Likes = require('../model/likes');
const sequelize = require('sequelize');


module.exports={
    async renderIndex(res,error = null,login = null,message = null){
        let articles = await Article.findAll({
            raw:true,
            order:[['createdAt','DESC']],
            attributes: ['IDArticle','Title','Highlight','Image','Content','IDUser','Description']
        });

        const most_likes = await Likes.findAll({
            raw: true,
            attributes: [
                'IDArticle',
                [sequelize.fn('COUNT', sequelize.col('Likes.IDLike')), 'likeCount']
            ],
            include: {
                model: Article, // Ensure this is the correct model name
                attributes: ['Title', 'Highlight', 'Image', 'Content', 'IDUser', 'Description']
            },
            group: ['Article.IDArticle', 'Article.Title', 'Article.Highlight', 'Article.Image', 'Article.Content', 'Article.IDUser', 'Article.Description','Likes.IDArticle'],
            order: [[sequelize.literal('likeCount'), 'DESC']],
        });
        
        res.render('../views/index', {error:error,login:login,message:message,articles:articles,most_likes})
    },
};