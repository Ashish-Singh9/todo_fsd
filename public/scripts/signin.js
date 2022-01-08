function send(email,password){

}

function validate(email,password){
    console.log(email.value,typeof email.value);
    console.log(password.value,typeof password.value);
    let msg={
        email:true,
        password:true
    }
    if(email.value==='')
    msg.email=false;
    
    if(password.value==='')
    msg.password=false;
    return msg;
}
function login(e)
{
    const email=document.getElementById('email');
    const password=document.getElementById('password');
    let msg=validate(email,password);
    if(msg.email&&msg.password){
        //send(email,password);
    }
    else{
        e.preventDefault();
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

