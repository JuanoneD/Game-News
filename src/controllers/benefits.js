const Benefits = require("../model/benefits");

module.exports={
    async insertBenefits(req,res){
        let id = req.params.user;
        let data = req.body;

        await Benefits.create({
            Description:data.Description
        });
        res.redirect(`/AdmPage/${id}`);
    }
}