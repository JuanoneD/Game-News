
module.exports={
    async renderIndex(res,error = null,login = null,message = null){
        res.render('../views/index', {error:error,login:login,message:message})
    }
};