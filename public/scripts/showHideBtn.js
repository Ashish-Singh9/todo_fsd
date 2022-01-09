document.getElementById('btnShowHide').addEventListener('click',(e)=>{
    e.preventDefault();
    let x = document.getElementById("password");
    let eyeImg=document.getElementById('eyeImg');
    if(eyeImg.src.indexOf('eyeOpen.svg')!=-1 &&x.type === "password")
    {
      x.type = "text";
      eyeImg.src="styles/eyeClose.svg";
    }
    else
    {
      x.type = "password";
      eyeImg.src="styles/eyeOpen.svg";
    }
    
});