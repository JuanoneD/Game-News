const subscrip = require('../model/subscriptions');
const payments = require('../model/payments');

module.exports =
{
    async InsertPayment(req, res)
    {
        let id_user = req.params.user;
        let id_sub = req.params.subscription;
        let data = req.body;

        if(!data.Method)
        {
            res.redirect("back");
            return;
        }

        let subscription = await subscrip.findByPk
        (
            id_sub,
            {
                raw: true,
                attributes: ['Price']
            }
        );

        let StartDate = new Date(Date.now());
        let EndDate = new Date(StartDate);

        EndDate.setDate(EndDate.getDate() + 30);

        await payments.create
        (
            {
                StartDate: StartDate.toISOString(),
                EndDate: EndDate.toISOString(),
                Value: subscription.Price,
                IDUser: id_user,
                IDMethod: data.Method,
                IDSubscription: id_sub
            }
        )

        res.redirect("back");
    }
}