const { where } = require('sequelize');
const subscriptions = require('../model/subscriptions');
const subbene = require('../model/subscriptionsBenefits');

module.exports = {
    async insertSubs(req,res){
        let data = req.body;
        let id = req.params.user;

        await subscriptions.create({
            Price:data.Price,
            Description:data.Description
        })
        res.redirect(`/AdmPage/${id}`);
    },
    async DeleteSubs(req,res){
        let id_user = req.params.user;
        let id_subs = req.params.subs;

        await subscriptions.destroy({
            where:{IDSubscription:id_subs}
        });

        res.redirect(`/AdmPage/${id_user}`);
    },
    async UpdateSubs(req,res){
        let id_user = req.params.user;
        let id_subs = req.params.subs;

        await subscriptions.update(req.body,{
            where:{IDSubscription:id_subs}
        });
        res.redirect(`/AdmPage/${id_user}`);
    }
}