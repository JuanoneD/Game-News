const users = require('../model/user');
const { createHash } = require('crypto');

module.exports = {
    async registerUser(req,res){
        let data = req.body;
        await users.create({
            Name: data.Name,
            Password: createHash('sha256').update(data.Password).digest('hex'),
            Email: data.Email,
            Admin: data.Admin
        })
        res.redirect('/');
    },
    async loginUser(req,res){
        let data = req.body;

        let login = await users.findOne({
            raw: true,
            attributes:['IDUser','Name','Password','Email','Admin'],
            where: {Email:data.Email} 
        });

        if(!login){
            res.redirect('/loginError');
            return;
        }

        if( login.Password == createHash('sha256').update(data.Password).digest('hex')){
            res.redirect('/',{user: login});
            return;
        }
        res.redirect('/loginError');
    }
};