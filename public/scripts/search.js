const searchTextBox=document.getElementById('searchtextbox');

searchTextBox.addEventListener('keyup',(e)=>searchTask(e));

function searchTask(e){
    let todoTableBody=document.getElementById('todoTableBody');
        let childrentodoTableBody=todoTableBody.children;
    let searchItem=e.target.value.toUpperCase();
            Array.from(childrentodoTableBody).forEach(e => {
            let todoSearchTask=e.children[1].children[1].innerText.toUpperCase();
            console.log(e.children[1].children[1]);
            if(todoSearchTask.indexOf(searchItem)>-1)
            {
                e.style.display="";
            }
            else
            {
               e.style.display="none";
            }    
        });
}