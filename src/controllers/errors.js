module.exports = 
{
    async LoginError(req,res)
    {

        res.render('../views/index', {loginfail: true});
    }
}