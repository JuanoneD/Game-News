const artilcle = require('../model/article');
const user = require('../model/user');

module.exports={
    async renderIndex(res,error = null,login = null,message = null){

        let articles = await artilcle.findAll({
            raw:true,
            attributes: ['IDArticle','Title','Highlight','Image','Content','IDUser','Description']
        });
        res.render('../views/index', {error:error,login:login,message:message,articles:articles})
    },

    
};