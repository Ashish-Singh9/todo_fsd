//handles req for login and signup
const initDb = require("../database/init");
initDb();
const createUser=require('../utils/createUser');
const validateUser=require('../methods/validateUser');
const changePasswordDb=require('../utils/changePasswordDb');
const validateForFp=require('../methods/validateForFp');
const login=(req,res)=>{
    res.render('login.ejs',{info:''});
}
const loginPost=(req,res)=>{
    let checkUser={
        email:req.body.email,
        password:req.body.password
    }
    if(checkUser.password===''||checkUser.email==='')
    {
        res.render('login.ejs',{info:'empty field'});
        return;
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
        res.render('signup.ejs',{info:''});
        return;    
    }

    createUser(user,function(isUserCreated,info,secKey,user){
        if(isUserCreated)
        {
            req.session.is_logged_in = true;
            let sendAbleUserData={
                name:user.name,
                email:user.email,
                todo:user.todos,
                avatar:user.name[0],
                isWc:true
            };
            req.session.secKey=secKey;
			req.session.user = sendAbleUserData;
            res.redirect('/welcomePage');
            return;
        }
        else
        {
            res.render('signup.ejs',{info});
        }
    })
}
const logout=(req,res)=>{
    req.session.destroy();
	res.redirect("/signin");
}
const forgotPassword=(req,res)=>{
    res.render('forgotpassword.ejs',{info:""});
}
const forgotPasswordPost=(req,res)=>{
    //console.log(req.body);
    let {email,secKey}=req.body;
    validateForFp(secKey,email,function(isUser,user){
        if(isUser)
        {
            req.session.is_logged_in = true;
            let sendAbleUserData={
                name:user.name,
                email:user.email,
                todo:user.todos,
                avatar:user.name[0],
                isWc:user.isWc
            };
            req.session.secKey=secKey;
			req.session.user = sendAbleUserData;
            res.redirect('/changepassword');
        }
        else
        {
            res.render('forgotpassword.ejs',{info:"wrong credentials!!"});
        }

    });
}
const changePassword=(req,res)=>{
    res.render('changepassword.ejs',{user:req.session.user,info:''});
}
const changePasswordPost=(req,res)=>{
    let {password,cPassword}=req.body;
    if(password===cPassword)
    changePasswordDb(password,req.session.user.email,function(stats){
       // console.log(stats);
        res.render('changepassword.ejs',{user:req.session.user,info:'password changed'});
    })
}
const welcome=(req,res)=>{
   if(req.session.user.isWc)
    {
        req.session.user.isWc=false;
        res.render('welcome.ejs',{secKey:req.session.secKey,name:req.session.user.name});
    }
    else
    {
        res.redirect('/todo');
    }
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
    forgotPasswordPost,
    changePassword,
    changePasswordPost,
    welcome,
    pageNotFound
}