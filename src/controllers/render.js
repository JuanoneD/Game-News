const articles = require('../model/article');
const users = require('../model/user');
const renders = require('../config/renders');

module.exports = {
    async pagInicialGet(req, res){
        let id = req.params.id;
        let login = null;
        if(typeof(id) === Number){
            login = await users.findByPk(id,{
                raw:true,
                attributes:['IDUser','Name','Password','Email','Admin']
            });
        }
        console.log(login);
        renders.renderIndex(res,null,login);
    },
    async pagWriteArticle(req,res){
        res.render('../views/WriteArticle',{error: ''});
    }
}