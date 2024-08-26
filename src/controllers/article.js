const users = require('../model/user');
const articles = require('../model/article');

module.exports = {
    async registerArticle(req,res){
        let data =  req.body;
        articles.create({
            Title: data.Title,
            Highlight:data.Highlight,
            Image: data.Image,
            Content: data.Content,
            IDUser: data.IDUser
        });
    }
    
}