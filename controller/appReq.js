//handles req for todo webapp
const savetodo=require('../utils/saveTodo');
const getTodoDb=require('../methods/getTodoDb');
const deleteTodoDb=require('../utils/deleteTodoDb');
const modifyTodoDb=require('../utils/modifyTodoDb');
const todo=(req,res)=>{
    res.render('todo.ejs',{user:req.session.user});
}
const getTodo=(req,res)=>{
    getTodoDb(req.session.user.email,function(isTodo,todoArr){
        if(isTodo)
        res.json(todoArr);
        else
        return;
    });
}
const saveTodo=(req,res)=>{
    console.log(req.body,typeof req.body);
    savetodo(req.body,req.session.user.email,function(){
        //console.log('data Saved!!');
    });
    res.sendStatus(200);
}
const modifyTodo=(req,res)=>{
    console.log(req.body,'modify');
    modifyTodoDb(req.body,req.session.user.email,function(stats){
        //console.log(stats);
        res.sendStatus(200);
    })
}
const deleteTodo=(req,res)=>{
    console.log(req.body);
    deleteTodoDb(req.body,req.session.user.email,function(stats){
        //console.log(stats);
        res.sendStatus(200);
    })
   
}
module.exports ={
    todo,
    getTodo,
    saveTodo,
    modifyTodo,
    deleteTodo
}