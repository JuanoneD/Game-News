

module.exports = {
    async getUserId(req,res){
        let id = req.query.id;
        if(!id){
            res.redirect('/Login') // change to link for login
            return null;
        }
        return id;
    }
}