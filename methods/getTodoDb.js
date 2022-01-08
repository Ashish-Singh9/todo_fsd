const getUser=require('../utils/getUser');
module.exports=function(checkUser,callback){
    getUser(checkUser,function(is,user){
        if(is)
        {   
           callback(true,user.todos);
        }
        else{
            callback(false,"something went wrong!!");
        }
    })
}