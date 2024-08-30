var Theme;

document.addEventListener
(
    "DOMContentLoaded",
    ()=>
    {
        Theme = localStorage.getItem("Theme");
        document.getElementById("body").setAttribute("data-bs-theme", Theme);
        Button = document.getElementById("theme");
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
    Button = document.getElementById("theme");
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