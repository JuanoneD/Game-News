const methods = require('../model/methods');

module.exports={
    async InsertMethods(req,res){
        let id = req.session.IDUser;
        let data = req.body;

        await methods.create({
            Description:data.Description
        });
        res.redirect(`/AdmPage`);
    },
    async DeleteMethods(req,res){
        let id = req.session.IDUser;
        let id_method = req.params.method;
        await methods.destroy({where:{IDMethod:id_method}});
        res.redirect(`/AdmPage`);
    },
    async UpdateMethods(req,res){
        let id = req.session.IDUser;
        let id_method = req.params.method;
        let data = req.body;

        await methods.update({
            Description: data.Description
        },{where:{IDMethod:id_method}});

        res.redirect(`/AdmPage`);
    }
}