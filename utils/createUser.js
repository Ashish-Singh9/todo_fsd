const userModel = require("../database/schema");
var bcrypt = require('bcryptjs');

module.exports=async function saveUser(newUser,callback){
    
    const salt=await bcrypt.genSalt(10);
    const secPassword=await bcrypt.hash(newUser.password,salt);
	const user = new userModel();

	user.name = newUser.name;
    user.email=newUser.email;
    user.password=secPassword;
    user.active=true;
    user.todos=[];
	const saveUserModel = user.save(function(err){
        if(err)
        {
            if(err.code===11000)
            {
                callback(false,"username has been tacken!!");
                return;
            }
            else
            {
                callback(false,"Its seems something is missing!!");
                return;
            }
        }
        else
        {
            callback(true,'wlcome to our family');          
            return;
        }
    });
}