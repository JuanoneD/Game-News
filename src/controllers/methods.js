const methods = require('../model/methods');

module.exports={
    async InsertMethods(req,res){
        let id = req.params.user;
        let data = req.body;

        await methods.create({
            Description:data.Description
        });
        res.redirect(`/AdmPage/${id}`);
    }
}