const getUser=require('../utils/getUser');
var bcrypt = require('bcryptjs');
module.exports=function(checkUser,callback){
    getUser(checkUser.email,async function(isUserExist,user){
        if(isUserExist)
        {
            let pass=user.password;
            const passComp=await bcrypt.compare(checkUser.password,pass);
            if(passComp)
            callback(true,user);
            else
            callback(false,"wrong credentials");
        }
        else{
            callback(false,"user Does' Exist!!");
        }
    })
}