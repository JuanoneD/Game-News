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
    console.log(idSub);
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
    }else if(method == 2){
        button.href = `/DeleteBenefit/${id_user}/${id_deleted}`
    }else if(method==3){
        button.href = `/DeleteSubscription/${id_user}/${id_deleted}`
    }
}

function ChangeUpdateADM(method,id_Updated,id_user){

    let form = document.getElementById('UpdateForm');
    if(method==1){
        let desc = document.getElementById(`MethDesc${id_Updated}`).innerHTML;
        document.getElementById('UpdataTitle').innerHTML = 'Editar Metodos de Pagamentos'
        form.innerHTML = `
        <div class="mb-3">
            <label for="Email" class="form-label">Descrição:</label>
            <input type="text" class="form-control" id="UpdateInput" value="${desc}" name="Description">
        </div>
        <button type="submit" class="btn btn-primary fw-bold text-uppercase">Editar</button>
        `
        form.action = `/UpdateMethod/${id_user}/${id_Updated}`
    }else if(method==2){
        let desc = document.getElementById(`BeneDesc${id_Updated}`).innerHTML;
        document.getElementById('UpdataTitle').innerHTML = 'Editar Beneficios'
        form.innerHTML = `
        <div class="mb-3">
            <label for="Email" class="form-label">Descrição:</label>
            <input type="text" class="form-control" id="UpdateInput" value="${desc}" name="Description">
        </div>
        <button type="submit" class="btn btn-primary fw-bold text-uppercase">Editar</button>
        `;
        form.action = `/UpdateBenefics/${id_user}/${id_Updated}`
    }else if(method==3){
        let desc = document.getElementById(`SubsDesc${id_Updated}`).innerHTML;
        let price = document.getElementById(`SubsPrice${id_Updated}`).innerHTML;
        form.innerHTML = `
        <div class="mb-3">
            <label for="Email" class="form-label">Descrição:</label>
            <input type="text" class="form-control" id="UpdateInput" value="${desc}" name="Description">
        </div>
        <div class="mb-3">
            <label for="Email" class="form-label">Valor:</label>
            <input type="Number" class="form-control" id="UpdatePrice" value="${price}" step="0.01" name="Price">
        </div>
        <button type="submit" class="btn btn-primary fw-bold text-uppercase">Editar</button>
        `
        document.getElementById('UpdataTitle').innerHTML = 'Editar Assinaturas'
        form.action = `/UpdateSubs/${id_user}/${id_Updated}`
    }
}
function UpdateRelation(data){

    let value = JSON.parse(data);
    let selection = document.getElementById('IdSelecRelation');
    
    let text = '<option value="0" hidden>Selecionar uma opção</option>';
    for(let i=0;i<value.length;i++){
        text +=`<option value="${value[i].IDSubscriptionsBenefits}">${value[i].nameBenefits}</option>`
    }   
    selection.innerHTML = text;
}