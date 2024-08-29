const { where } = require('sequelize');
const users = require('../model/user');
const { createHash } = require('crypto');
const { error } = require('console');
const session = require('../config/session');
const renders = require('../config/renders');

module.exports = {
    async registerUser(req,res){
        let data = req.body;

        if(data.PasswordConfirm != data.Password){
            renders.renderIndex(res,'As Senhas não coincidem');
            return;
        }
        
        await users.create({
            Name: data.Name,
            Password: createHash('sha256').update(data.Password).digest('hex'),
            Email: data.Email,
            Admin: data.Admin
        })

        renders.renderIndex(res,null,null,'Usuario cadastrado com sucesso');
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

        if(OldPassword.Password != createHash('sha256').update(data.Password).digest('hex'))
        {
            console.log(createHash('sha256').update(data.Password).digest('hex'));
            res.render('../views/Update', {error: 'Senha Errada', id: id_user});
            return;
        }

        if(data.PasswordNew1 != data.PasswordNew2)
        {
            res.render('../views/Update', {error: 'Senhas não coincedem', id: id_user});
            return;
        }

        await users.update({
            Name: data.Name,
            Password: createHash('sha256').update(data.PasswordNew1).digest('hex'),
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
            
            renders.renderIndex(res,'Usuario não encontrado');
            return;
        }
        
        if( login.Password == createHash('sha256').update(data.Password).digest('hex')){
            renders.renderIndex(res,null,login,'Logado com sucesso');
            return;
        }
        renders.renderIndex(res,'Senha errada');
    },
    async logout(req,res){
        renders.renderIndex(res,null,null,'Deslogado com sucesso');
    }
};