const express=require('express');
const routes=express.Router();
const userController=require('../controllers/Users');




routes.post('/user/register',userController.registerUser);

module.exports=routes;