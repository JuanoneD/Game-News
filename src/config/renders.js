const artilcle = require('../model/article');
const user = require('../model/user');

module.exports={
    async renderIndex(res,error = null,login = null,message = null){

        let articles = artilcle.findAll({
            raw:true,
            attributes: ['Title','Highlight','Image','Content','IDUser']
        });
        res.render('../views/index', {error:error,login:login,message:message,articles:articles})
    },
};