const addTaskBtn=document.getElementById('todoBtn');
const addTaskInput=document.getElementById('todoInputBox');
const todoTableBody=document.getElementById('todoTableBody');

function setTodo(todos){
    todos.forEach(function(todo)
    {
        createAndAppendTr(todo)
    })
}

getTodo(setTodo);

//function
function dateTodo(){
    let d = new Date();
    return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
}
function timeTodo(){
    let d = new Date();
    return d.getHours()+":"+d.getMinutes()+":"+d.getMilliseconds();
}
function cE(type)
{
    let element=document.createElement(type);
    return element;
}
function createAndAppendTr(todoTask)
{
    /*
        tr
            td :- sno
            /td
            td class="todoData" :-
                 div class="todoDate_time" :-
                    span class="todoTime" time(24 hr formate)
                    span class="todoDate" date(day/month/year)
                 /div
                 div class="todoTaskText" :-
                 content (task)
                 /div
            /td
            td :- input type="checkbox" name="todoTaskDone_Undone" id="todoTaskDone_Undone"
            /td
            td  id=todoDeleteTask:- img src="css/trashBox.svg" alt="trashBox"
            /td
        /tr    
        { type:"",classs:"", ids:"" }
    */
   var taskIndex=todoTableBody.children.length+1;
    let tr=cE("tr");
        let tdSno=cE("td");
            tdSno.innerText=taskIndex;
        let tdDateTimeContent=cE("td");    
            let divDateTime=cE("div");
                divDateTime.setAttribute("class","todoDate_time");
                let todoTime=cE("span");
                    todoTime.setAttribute("id","todoTime");
                let todoDate=cE("span");
                    todoDate.setAttribute("id","todoDate");
                    todoTime.innerText=todoTask.time;
                    todoDate.innerText=todoTask.date;
                divDateTime.append(todoTime);    
                divDateTime.append(todoDate);
            let divContent=cE("div"); 
                divContent.append(todoTask.task);     
                divContent.style.textDecoration=todoTask.isComplete?"line-through":"none";
            tdDateTimeContent.append(divDateTime);
            tdDateTimeContent.append(divContent);

        let tdCheckBox=cE("td");
            let todoInputCheckBox=cE("input");    
            todoInputCheckBox.setAttribute("id","todoTaskDone_Undone");
            todoInputCheckBox.setAttribute("type","checkbox");
            todoInputCheckBox.checked=todoTask.isComplete;
            todoInputCheckBox.addEventListener("click",(e)=>todoCheckBox(e,divContent,todoTask));
            tdCheckBox.append(todoInputCheckBox);

        let tdTrash=cE("td");
            tdTrash.setAttribute("id","todoDeleteTask");
            let imgTrash=cE("img");
                imgTrash.setAttribute("src","styles/trashBox.svg");
                imgTrash.setAttribute("id","taskDelete");
                imgTrash.addEventListener("click",(e)=>todoDeleteTask(e,tr,todoTask));
            tdTrash.append(imgTrash);

        tr.append(tdSno); tr.append(tdDateTimeContent);    
        tr.append(tdCheckBox); tr.append(tdTrash);
    
     todoTableBody.append(tr); 
}
//checkbox
function todoCheckBox(e,divContent,todoTask){
    todoTask.isComplete=e.target.checked;
    modifyTodo(todoTask);
    if(e.target.checked===true)
        divContent.style.textDecoration = "line-through";
    else
        divContent.style.textDecoration = "none";
}

function todoDeleteTask(e,tr,todoTask){
    deleteTodoReq(todoTask);
    tr.remove();
}

function addTaskUsingBtn(){
    const taskValue=addTaskInput.value;
    let todoTask={
        task:taskValue,
        isComplete:false,
        time:timeTodo(),
        date:dateTodo()
    };
    sendToServer(todoTask,createAndAppendTr);
    addTaskInput.value="";
}
//add task to task section using btn
addTaskBtn.addEventListener('click',addTaskUsingBtn);
//add task to task section using enter 
//function
function addTaskUsingEnter(e){
    let taskValue=e.target.value;
    let todoTask={
        task:taskValue,
        isComplete:false,
        time:timeTodo(),
        date:dateTodo()
    };
    if(e.keyCode === 13 && taskValue)
    {
        sendToServer(todoTask,createAndAppendTr);
        e.target.value="";
    }

}
addTaskInput.addEventListener('keyup',e=>addTaskUsingEnter(e));

//sending data to server
function getTodo(callback)
{
     var request = new XMLHttpRequest();

  request.open("get","/wtodo");
  
  request.send();

  request.addEventListener("load", function()
  {
    
    callback(JSON.parse( request.responseText ))

  });
}
function sendToServer(todoTask,callback){
        
    var request = new XMLHttpRequest();

    request.open("POST","/wtodo");
    request.setRequestHeader("Content-Type", "application/json");
    
    request.send(JSON.stringify( todoTask));
    

    request.addEventListener("load", function()
    {

        request.status === 200 && callback(todoTask)

    });
}

function modifyTodo(todoTask){
    var request = new XMLHttpRequest();

    request.open("PATCH","/wtodo");
    request.setRequestHeader("Content-Type", "application/json");
    
    request.send(JSON.stringify( todoTask));
    request.addEventListener("load", function()
    {
        
        request.status === 200 && console.log("modification complete")

    });
}

function deleteTodoReq(todoTask){
    var request = new XMLHttpRequest();

    request.open("DELETE","/wtodo");
    request.setRequestHeader("Content-Type", "application/json");
    
    request.send(JSON.stringify( todoTask));
    request.addEventListener("load", function()
    {
        
       if( request.status === 200 ){ 
        clearTask();
        getTodo(setTodo);
       }

    });   
}

function clearTask(){
    Array.from(todoTableBody.children).forEach(e => {
        e.remove();
    })
}