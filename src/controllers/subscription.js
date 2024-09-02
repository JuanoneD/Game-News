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
    }
}