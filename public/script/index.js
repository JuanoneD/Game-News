var Theme;

document.addEventListener
(
    "DOMContentLoaded",
    ()=>
    {
        Theme = localStorage.getItem("Theme");
        document.getElementById("body").setAttribute("data-bs-theme", Theme);
<<<<<<< HEAD
        let Button = document.getElementById("theme");
=======
        Button = document.getElementById("theme");
>>>>>>> 3853927 (Dark theme implemented)
        if(Theme == 'light')
        {
            Button.innerHTML = '🌙';
        }else
        {
            Button.innerHTML = '☀️';
        }
    }
)

function errorclick(){
    console.log('Rodou');
    document.getElementById('inputerror').click();
}

function ToggleTheme()
{
    let Button = document.getElementById("theme");
    if(Theme == 'dark')
    {
        Theme = 'light';
        Button.innerHTML = '🌙';
    }else
    {
        Theme = 'dark';
        Button.innerHTML = '☀️';
    }
    localStorage.setItem("Theme", Theme);
    document.getElementById("body").setAttribute("data-bs-theme", Theme);
}

function ChangeFormImg()
{
    let input = document.getElementById("ImgInput");
    if(input.files[0])
    {
        let Reader = new FileReader();
        Reader.onload = (e)=>{document.getElementById("FormImg").src = e.target.result};
        Reader.readAsDataURL(input.files[0]);
    }
}