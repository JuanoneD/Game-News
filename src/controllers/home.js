const articles = require('../model/article');
const users = require('../model/user');

module.exports = {
    async pagInicialGet(req, res){
        res.render('../views/index');
    }
}