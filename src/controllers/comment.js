const users = require('../model/user');
const articles = require('../model/article');
const comments = require('../model/comment');
const functions = require('../config/functions');

module.exports = {
    async registerComments(req,res){
        let id_user = await functions.getUserId(req,res);
        if(!id_user){return;}
        
    }
}