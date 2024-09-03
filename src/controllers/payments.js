const subscrip = require('../model/subscriptions');
const payments = require('../model/payments');

module.exports =
{
    async InsertPayment(req, res)
    {
        let id_user = req.params.user;
        let data = req.body;

        let subscription = await subscrip.findByPk
        (
            data.Subscription,
            {
                raw: true,
                attributes: ['Price']
            }
        );

        let StartDate = new Date(Date.now());
        let EndDate = StartDate;

        EndDate.setDate(EndDate.getDate() + 30);

        await payments.create
        (
            {
                StartDate: StartDate.toISOString(),
                EndDate: EndDate.toISOString(),
                Value: subscription.Price,
                IDUser: id_user,
                IDMethod: data.Method,
                IDSubscription: data.Subscription
            }
        )

        res.redirect("back");
    }
}