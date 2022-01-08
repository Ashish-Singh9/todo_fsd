//handles req for login and signup
const initDb = require("../database/init");
initDb();
const createUser=require('../utils/createUser');
const validateUser=require('../methods/validateUser');
const login=(req,res)=>{
    res.render('login.ejs',{info:''});
}
const loginPost=(req,res)=>{
    let checkUser={
        email:req.body.email,
        password:req.body.password
    }
    validateUser(checkUser,function(isUser,user){
        if(isUser){
            req.session.is_logged_in = true;
            let sendAbleUserData={
                name:user.name,
                email:user.email,
                todo:user.todos,
                avatar:user.name[0]
            };
			req.session.user = sendAbleUserData;
  			res.redirect("/todo");
            return       
        }
        else{
            res.render('login.ejs',{info:user});
        }
    });
}
const signup=(req,res)=>{
    res.render('signup.ejs',{info:''});
}
const signupPost=(req,res)=>{
    let user={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    if(user.name===''||user.email===''||user.password==='')
    {
        res.render('signup.ejs');
        return;    
    }

    createUser(user,function(isUserCreated,info){
        res.render('signup.ejs',{info});
    })
}
const logout=(req,res)=>{
    req.session.destroy();
	res.redirect("/signin");
}
const forgotPassword=(req,res)=>{
    res.render('forgotpassword.ejs');
}
const changePassword=(req,res)=>{
    res.render('changepassword.ejs');
}
const pageNotFound=(req,res)=>{
    res.send("404 page not found");
}
module.exports ={
    login,
    loginPost,
    signup,
    signupPost,
    logout,
    forgotPassword,
    changePassword,
    pageNotFound
}