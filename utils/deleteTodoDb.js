const userModel = require("../database/schema");

module.exports=async function saveUser(todo,email,callback){
    
    const user=await userModel.findOne({email});
    user.todos =await user.todos.filter((u) => u.task !== todo.task);
	const stat=user.save();
    callback(stat);
}
