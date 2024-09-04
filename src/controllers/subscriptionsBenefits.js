const { where } = require('sequelize');
const subsBenefits = require('../model/subscriptionsBenefits');

module.exports = {
    async insertSubsBenefits(req,res){
        let data = req.body;
        let id_user = req.params.user;
        let id = req.params.sub;


        let subs = await subsBenefits.findAll({
            raw:true,
            where:{SubscriptionIDSubscription:id,BenefitIDBenefit:data.IDBenefit}
        })
        if(subs.length != 0 || data.IDBenefit == 0){
            res.redirect(`/AdmPage/${id_user}`);
            return;
        }

        await subsBenefits.create({
            SubscriptionIDSubscription:id,
            BenefitIDBenefit:data.IDBenefit
        });
        
        res.redirect(`/AdmPage/${id_user}`);
    },
    async DeleteRelation(req,res){
        let id_user = req.params.user;
        let data = req.body;

        await subsBenefits.destroy({
            where:{IDSubscriptionsBenefits:data.IDSubscriptionsBenefits}
        });

        res.redirect(`/AdmPage/${id_user}`);
    }
}