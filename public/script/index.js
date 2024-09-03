var Theme;

document.addEventListener
(
    "DOMContentLoaded",
    ()=>
    {
        Theme = localStorage.getItem("Theme");
        document.getElementById("body").setAttribute("data-bs-theme", Theme);
        let CarouselTitle = document.getElementsByName("CarouselTitle");
        let Button = document.getElementById("theme");
        if(Theme == 'light')
        {
            Button.innerHTML = '🌙';
        }else
        {
            Button.innerHTML = '☀️';
        }
        CarouselTitle.forEach((item)=>{item.classList.add(`OutlinedText-${Theme}`)});
    }
)

function errorclick(){
    document.getElementById('inputerror').click();
}

function ToggleTheme()
{
    let Button = document.getElementById("theme");
    let CarouselTitle = document.getElementsByName("CarouselTitle");
    CarouselTitle.forEach((item)=>{item.classList.remove(`OutlinedText-${Theme}`)});
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

    CarouselTitle.forEach((item)=>{item.classList.add(`OutlinedText-${Theme}`)});
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

function SetIDsub(idSub){
    document.getElementById('InsertSubBenefit').action+= `${idSub}`;
}

function ChangeDeleteComment(id){
    document.getElementById('DeletedCommentButton').href += id;
    document.getElementById('UpdateCommentForm').action += id;
    document.getElementById('CommentInput').value = document.getElementById('CommentValue').innerHTML;
}

function ChangeDeleteADM(method,id_deleted,id_user){
    let button = document.getElementById('DeletedAdmButton');
    if(method == 1){
        button.href = `/DeleteMethod/${id_user}/${id_deleted}`
    }
}