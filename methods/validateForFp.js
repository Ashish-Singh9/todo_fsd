const getUser=require('../utils/getUser');
var bcrypt = require('bcryptjs');
module.exports=function(secKey,email,callback){
    getUser(email,async function(isUserExist,user){
        if(isUserExist)
        {
            let pass=user.secKey;
            const passComp=await bcrypt.compare(secKey,pass);
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