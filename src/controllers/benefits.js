
const { where } = require("sequelize");
const Benefits = require("../model/benefits");

module.exports={
    async insertBenefits(req,res){
        let id = req.params.user;
        let data = req.body;

        await Benefits.create({
            Description:data.Description
        });
        res.redirect(`/AdmPage/${id}`);
    },
    async DeleteBenefits(req,res){
        let id_user = req.params.user;
        let id_benefict = req.params.benefit

        await Benefits.destroy({
            where:{IDBenefit:id_benefict}
        });
        res.redirect(`/AdmPage/${id_user}`);
    },
    async UpdateBenefits(req,res){
        let id_user = req.params.user;
        let id_benefict = req.params.benefit

        await Benefits.update(req.body,{
            where:{IDBenefit:id_benefict}
        })
        res.redirect(`/AdmPage/${id_user}`);
    }
}