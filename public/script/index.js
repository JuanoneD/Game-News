const { createHash } = require('crypto');

function errorclick(){
    console.log('Rodou');
    document.getElementById('inputerror').click();
}


function saveLogin(){
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_password").value;
    password = createHash('sha256').update(password).digest('hex');

    let login = [];

    login.push(email);
    login.push(password);

    
    localStorage.setItem("login", JSON.stringify(login));
}
