const User=require('../models/Users');
const jwt=require('jsonwebtoken');
const registertoken = require('../utils/jsonwebhandler');


const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
      if(!(name && email && password)){
        return res.status(400).send('All inputs are required');
      }
      const oldUser=await User.findOne({email}).select('+password');

      if(oldUser){
        return res.status(400).send('you are already registerd with us');
      }else{
    const userRegister=  await User.create({
        name,
        email,
        password
      })


      const token=jwt.sign({_id:userRegister.id,email},process.env.SECRET_KEY,{expiresIn:'2h'})
      userRegister.token=token;
     return res.status(201).json({
        message:'success',
        userRegister,
        
      })
    }

    }catch(err){
     res.status(400).json({message:err.message})
    }
}





module.exports={registerUser};
