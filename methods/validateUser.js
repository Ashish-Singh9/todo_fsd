const getUser=require('../utils/getUser');
var bcrypt = require('bcryptjs');
module.exports=function(checkUser,callback){
    getUser(checkUser.email,async function(isUserExist,user){
        if(isUserExist)
        {
            let pass=user.password;
            console.log(typeof pass);
            console.log(typeof checkUser.password,checkUser.password);
            const passComp=await bcrypt.compare(checkUser.password,pass);
            console.log(user);
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