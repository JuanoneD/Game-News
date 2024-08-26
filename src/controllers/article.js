const users = require('../model/user');
const articles = require('../model/article');

module.exports = {
    async registerArticle(req,res){
        let data =  req.body;
        let id_user = await functions.getUserId(req,res);
        if(!id_user){return;}
        
        articles.create({
            Title: data.Title,
            Highlight:data.Highlight,
            Image: data.Image,
            Content: data.Content,
            IDUser: id_user
        });
    }
    
}