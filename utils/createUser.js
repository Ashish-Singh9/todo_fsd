const userModel = require("../database/schema");
let bcrypt = require('bcryptjs');
let genRandom=require('../methods/genRandom');
module.exports=async function saveUser(newUser,callback){
    
    const salt=await bcrypt.genSalt(10);
    const secPassword=await bcrypt.hash(newUser.password,salt);
    let secKey=''+genRandom();
    const sec=await bcrypt.hash(secKey,salt);

	const user = new userModel();

	user.name = newUser.name;
    user.email=newUser.email;
    user.password=secPassword;
    user.secKey=sec;
    user.active=true;
    user.todos=[];
    user.isWc=false;
	const saveUserModel = user.save(function(err){
        if(err)
        {
            if(err.code===11000)
            {
                callback(false,"username has been tacken!!",null,null);
                return;
            }
            else
            {
                callback(false,"Its seems something is missing!!",null,null);
                return;
            }
        }
        else
        {
            callback(true,'wlcome to our family',secKey,user);          
            return;
        }
    });
}