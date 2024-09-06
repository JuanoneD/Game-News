const users = require('../model/user');
const { createHash } = require('crypto');
const renders = require('../config/renders');

module.exports = {
    async registerUser(req,res){
        let data = req.body;

        if(!(data.Name || data.Email || data.Password))
        {
            renders.renderIndex(res,'Alguns dados não foram preenchidos corretamente',null,null);
        }

        if(data.PasswordConfirm != data.Password){
            renders.renderIndex(res,'As Senhas não coincidem');
            return;
        }
        
        let UserEmail = await users.findOne({raw: true, attributes: ['Email'], where:{Email: data.Email}});

        if(UserEmail)
        {
            renders.renderIndex(res,'Email já cadastrado',null,null);
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
        let id_user = req.session.IDUser;

        OldPassword = await users.findByPk
        (
            id_user, 
            {
                raw: true,
                attributes: ['IDUser','Name','Password','Email','Admin']
            }
        );

        if(OldPassword.Password != createHash('sha256').update(data.Password).digest('hex'))
        {
            renders.renderIndex(res, 'Senha Errada',OldPassword);
            return;
        }

        if(data.PasswordNew1 != data.PasswordNew2)
        {
            renders.renderIndex(res,'Senhas não coincedem',OldPassword);
            return;
        }
        
        await users.update({
            Name: data.Name,
            Email: data.Email,
            Admin: data.Admin
        },{where:{IDUser:id_user}});

        if(data.PasswordNew1)
        {
            await users.update({
            Password: createHash('sha256').update(data.PasswordNew1).digest('hex'),
            },{where:{IDUser:id_user}});
        }
        
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

            req.session.IDUser = login.IDUser;

            return;
        }
        renders.renderIndex(res,'Senha errada');
    },
    async logout(req,res){
        req.session.destroy()
        res.redirect('/');
    }
};