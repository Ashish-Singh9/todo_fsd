const userModel = require("../database/schema");

module.exports =async function(email,callback)
{
    try{
        
        const user=await userModel.findOne({email});
        callback(true,user);
    }
    catch(err){
        callback(false,user);
        console.log(err);
    }

}