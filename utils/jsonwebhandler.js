const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();



const registertoken=(user)=>{
  return  jwt.sign(user,process.env.SECRET_KEY,{expiresIn:'2h'});
}



module.exports=registertoken;
