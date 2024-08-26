const users = require('../model/user');
const { createHash } = require('crypto');

module.exports = {
    async registerUser(req,res){
        let data = req.body;
        await users.create({
            Name: data.Name,
            Password: createHash('sha256').update(data.Password),
            Email: data.Email,
            Admin: data.Admin
        })
        res.redirect('/');
    },
    async loginUser(req,res){
        let data = req.body;

        let login = await users.findOne({where: {Email:data.Password} });
        if( login.Password == createHash('sha256').update(data.Password).digest('hex')){
            res.redirect(`/${login.IDUser}`);
            return;
        }
        res.redirect('/loginError');
    }
};