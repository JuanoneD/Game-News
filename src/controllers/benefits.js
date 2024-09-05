const Benefits = require("../model/benefits");

module.exports={
    async insertBenefits(req,res){
        let id = req.session.IDUser;
        let data = req.body;

        await Benefits.create({
            Description:data.Description
        });
        res.redirect(`/AdmPage/${id}`);
    },
    async DeleteBenefits(req,res){
        let id_user = req.session.IDUser;
        let id_benefit = req.params.benefit

        await Benefits.destroy({
            where:{IDBenefit:id_benefit}
        });
        res.redirect(`/AdmPage/${id_user}`);
    },
    async UpdateBenefits(req,res){
        let id_user = req.session.IDUser;
        let id_benefit = req.params.benefit

        await Benefits.update(req.body,{
            where:{IDBenefit:id_benefit}
        })
        res.redirect(`/AdmPage/${id_user}`);
    }
}