const userModel = require("../database/schema");

module.exports=async function saveUser(todo,email,callback){
    
    const user=await userModel.findOne({email});
    user.todos.forEach(e => {
        if(e.task===todo.task)
        e.isComplete=(e.isComplete^1);
    });
	const stat=user.save();
    callback(stat);
}