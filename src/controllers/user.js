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
        let id_user = req.params.id;

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
        },{where:{IDUser:id_user}});
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
            res.render('../views/Index',{login,loginfail:true});
            return;
        }

        if( login.Password == createHash('sha256').update(data.Password).digest('hex')){
            res.render('../views/Index',{login,loginfail:false});
            return;
        }
        res.render('../views/Index',{login,loginfail:true});
    },
    async logout(req,res){
        res.render('../views/Index',{login:null,loginfail:false})
    }
};