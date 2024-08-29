const articles = require('../model/article');
const users = require('../model/user');
const renders = require('../config/renders');

module.exports = {
    async pagInicialGet(req, res){
        renders.renderIndex(res);
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