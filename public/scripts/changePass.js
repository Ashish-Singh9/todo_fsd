document.getElementById('changePasswordx').addEventListener('submit',changePassx);

function changePassx(e){
    const inpPass=document.getElementById('pass').value;
    const inpPassC=document.getElementById('inpPassC').value;
    if(inpPass===inpPassC)
    {
        console.log(inpPass," ",inpPassC);
    }
    else
    {
        e.preventDefault();
    }
    
}

document.getElementById('inpPassC').addEventListener('keyup',(e)=>{
    let pass=document.getElementById('pass');
    if(pass.value===e.target.value)
    e.target.style.borderBottom="2px solid blue";
    else
    e.target.style.borderBottom="2px solid red";
  });
  document.getElementById('btnShowHide').addEventListener('click',(e)=>{
      e.preventDefault();
      let x = document.getElementById("pass");
    
      if(e.target.children[0].src.indexOf('eyeOpen.svg')!=-1 &&x.type === "password")
      {
        x.type = "text";
          e.target.children[0].src="styles/eyeClose.svg";
      }
      else
      {
        x.type = "password";
        e.target.children[0].src="styles/eyeOpen.svg";
      }
      
  });