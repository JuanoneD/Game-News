const fs = require('fs');
module.exports = 
{
    CreateSession(login)
    {
        const fileName = `${login.IDUser}.json`;
        fs.writeFileSync("public/sessions/" + fileName, JSON.stringify(login), (err) => {if(err){console.log(err)}});
    },
    GetSession(IDUser)
    {
        const fileName = `${IDUser}.json`;
        return JSON.parse(fs.readFileSync("public/sessions/" + fileName, (err) => {if(err){console.log(err)}}));
    },
    DeleteSession(IDUser)
    {
        const fileName = `${IDUser}.json`;
        fs.unlinkSync("public/sessions/" + fileName);
    }
}