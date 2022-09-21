const mongoose=require('mongoose');
const bcrypt=require('bcrypt');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        ,"please Provide a valid Email"],
        unique:true,
        required:[true,'email is required']
    },
    password:{
        type:String,
        minLength:[8,'password not yet strong enough'],
        validate:{
            validator: function(password){
                return /([A-Z]+)[0-9]+/.test(password);
            },
            message:(props)=>`${props.value} is missing `
        },
        required:[true,'password is required']
    },
    token:String,

},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!(this.isModified('password'))){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    
    return next();
})


const User=mongoose.model('User',userSchema);

module.exports=User;