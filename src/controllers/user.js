const { where } = require('sequelize');
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
    async UpdateUser(req,res){
        let data = req.body;
        let id_user = await functions.getUserId(req,res);
        if(!id_user){return;}

        OldPassword = await users.findByPk
        (
            id_user, 
            {
                raw: true,
                attributes: ['Password']
            }
        );

        if(createHash('sha256').update(data.Password1).digest('hex') != OldPassword)
        {
            res.render('../views/Update.ejs', {error: 'WrongPassword'});
            return;
        }

        if(Password2 != Password3)
        {
            res.render('../views/Update.ejs', {error: 'RepeatMismatch'});
            return;
        }

        await users.update({
            Name: data.Name,
            Password: createHash('sha256').update(data.Password2).digest('hex'),
            Email: data.Email,
            Admin: data.Admin
        },{where:{IDUser:id}});
    },
    async loginUser(req,res){
        let data = req.body;

        let login = await users.findOne({
            raw: true,
            attributes:['IDUser','Name','Password','Email','Admin'],
            where: {Email:data.Email} 
        });

        if(!login){
            res.redirect('/loginError/?error=login');
            return;
        }

        if( login.Password == createHash('sha256').update(data.Password).digest('hex')){
            res.redirect('/?id=' + encodeURIComponent(login.IDUser));
            return;
        }
        res.redirect('/loginError/?error=password');
    }
};