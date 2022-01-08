function send(email,password){

}

function validate(name,email,password){
    console.log(email.value,typeof email.value);
    console.log(password.value,typeof password.value);
    let msg={
        name:true,
        email:true,
        password:true
    }
    if(name.value==='')
    msg.name=false;

    if(email.value==='')
    msg.email=false;
    
    if(password.value==='')
    msg.password=false;
    return msg;
}
function login(e)
{
    const name=document.getElementById('name');
    const email=document.getElementById('email');
    const password=document.getElementById('password');
    let msg=validate(name,email,password);
    if(msg.email&&msg.password){
        //send(email,password);
    }
    else{
        e.preventDefault();
        if(!msg.name){
            name.style.backgroundColor='rgb(240 15 15 / 15%)';
            name.style.borderBottom="2px solid red";
        }
        if(!msg.email)
        {
            email.style.backgroundColor='rgb(240 15 15 / 15%)';
            email.style.borderBottom="2px solid red";
        }
        if(!msg.password)
        {
            password.style.backgroundColor='rgb(240 15 15 / 15%)';
            password.style.borderBottom="2px solid red";
        }
        document.getElementById('info').innerText='empty field!!';
    }
}
document.getElementById('sendBtnEmail').addEventListener('click',login);
function resetStyle(e){
    
    e.target.style.backgroundColor='';
    e.target.style.borderBottom="";    
}

document.getElementById('email').addEventListener('keyup',resetStyle);
document.getElementById('password').addEventListener('keyup',resetStyle);
document.getElementById('name').addEventListener('keyup',resetStyle);

