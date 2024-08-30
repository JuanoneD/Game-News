const articles = require('../model/article');
const users = require('../model/user');
const renders = require('../config/renders');

module.exports = {
    async pagInicialGet(req, res){
        let id = req.params.id;
        let login = null;
        console.log(id);
        if(Number(id)){
            login = await users.findByPk(id,{
                raw:true,
                attributes:['IDUser','Name','Password','Email','Admin']
            });
        }
        console.log(login);
        renders.renderIndex(res,null,login);
    },
    async pagWriteArticle(req,res){
        let id = req.params.user;
        if(Number(id)){
            login = await users.findByPk(id,{
                raw:true,
                attributes:['IDUser','Name','Password','Email','Admin']
            });
        }
        if(login.Admin == 0){
            res.redirect(`/${id}`);
            return;
        }
        res.render('../views/WriteArticle',{login,error: ''});
    }
}