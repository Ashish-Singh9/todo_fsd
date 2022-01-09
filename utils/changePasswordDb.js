const userModel = require("../database/schema");
var bcrypt = require('bcryptjs');
module.exports=async function saveUser(password,email,callback){
    const salt=await bcrypt.genSalt(10);
    const secPassword=await bcrypt.hash(password,salt);
    const user=await userModel.findOne({email});
        user.password=secPassword;
	const stat=user.save();
    callback(stat);
}