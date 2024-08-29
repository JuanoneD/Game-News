const articles = require('../model/article');
const users = require('../model/user');

module.exports = {
    async pagInicialGet(req, res){
        res.render('../views/index',{login:null,error:null});
    },
    async pagUpdate(req,res){
        let id = req.params.id
        if(!id) return;

        res.render('../views/Update',{id, error: ''});
    },
    async pagWriteArticle(req,res){
        res.render('../views/WriteArticle',{error: ''});
    }
}