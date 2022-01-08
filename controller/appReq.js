//handles req for todo webapp
const todo=(req,res)=>{
    res.render('todo.ejs',{user:req.session.user});
}

module.exports ={
    todo
}