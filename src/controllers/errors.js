module.exports = 
{
    async LoginError(req,res)
    {
        const error = req.query.error;
        res.render('../views/index', {loginfail: true, error: error});
    }
}