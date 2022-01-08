const express = require('express')
const checkAuth=require('../middlewares/checkAuth');
//controller for login and signup
const {
    login,
    loginPost,
    signup,
    signupPost,
    logout,
    forgotPassword,
    changePassword,
    pageNotFound
}=require('../controller/authReq');
//contoller for todoweb app
const {
    todo,
    getTodo,
    saveTodo,
    modifyTodo,
    deleteTodo
}=require('../controller/appReq');

const router=express.Router();


router.route('/').get(login);
router.route('/signin').get(login).post(loginPost);
router.route('/signup').get(signup).post(signupPost);
router.route('/logout').get(checkAuth,logout);
router.route('/forgot').get(forgotPassword);
router.route('/changepassword').get(checkAuth,changePassword);
router.route('/todo').get(checkAuth,todo);

router.route('/wtodo').get(getTodo).post(saveTodo).patch(modifyTodo).delete(deleteTodo);
router.get("*",pageNotFound);
module.exports =router;