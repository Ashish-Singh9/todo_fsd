document.getElementById('sendBtnEmail').addEventListener('click',sendReqToResetPass);

function sendReqToResetPass(e){
    let email=document.getElementById("email");
    let info=document.getElementById('info');
    if(!validateEmail(email.value))
    {
        e.preventDefault();
        isntFromS.innerText="somthing went wrong!!";
        email.style.backgroundColor="rgba(246, 7, 7, 0.568)";
    }
}

const validateEmail = (email) =>{
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};