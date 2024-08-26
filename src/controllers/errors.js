module.exports = 
{
    async LoginError(req,res)
    {

        res.redirect('/', {loginfail: true});
    }
}