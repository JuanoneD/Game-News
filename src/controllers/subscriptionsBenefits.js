const subsBenefits = require('../model/subscriptionsBenefits');

module.exports = {
    async insertSubsBenefits(req,res){
        let data = req.body;
        let id_user = req.params.user;
        let id = req.params.sub;


        let subs = await subsBenefits.findAll({
            where:{SubscriptionIDSubscription:id,BenefitIDBenefit:data.IDBenefit}
        })
        if(subs == []){
            res.redirect(`/AdmPage/${id_user}`);
            return;
        }


        await subsBenefits.create({
            SubscriptionIDSubscription:id,
            BenefitIDBenefit:data.IDBenefit
        });
        
        res.redirect(`/AdmPage/${id_user}`);
    }
}