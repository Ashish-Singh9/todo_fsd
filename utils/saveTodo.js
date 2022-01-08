const userModel = require("../database/schema");

module.exports=async function saveUser(newTodo,email,callback){
    
    const user=await userModel.findOne({email});
    user.todos.push(newTodo);
	const stat=user.save();
    callback(stat);
}