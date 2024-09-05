const subsBenefits = require('../model/subscriptionsBenefits');

module.exports = {
    async insertSubsBenefits(req,res){
        let data = req.body;
        let id_user = req.session.IDUser;
        let id = req.params.sub;


        let subs = await subsBenefits.findAll({
            raw:true,
            where:{SubscriptionIDSubscription:id,BenefitIDBenefit:data.IDBenefit}
        })
        if(subs.length != 0 || data.IDBenefit == 0){
            res.redirect(`/AdmPage`);
            return;
        }

        await subsBenefits.create({
            SubscriptionIDSubscription:id,
            BenefitIDBenefit:data.IDBenefit
        });
        
        res.redirect(`/AdmPage`);
    },
    async DeleteRelation(req,res){
        let id_user = req.session.IDUser;
        let data = req.body;

        console.log(data);

        await subsBenefits.destroy({
            where:{IDSubscriptionsBenefits:data.IDSubscriptionsBenefits}
        });

        res.redirect(`/AdmPage`);
    }
}