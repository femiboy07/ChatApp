const express=require('express');
const bodyparser=require('body-parser');
const dotenv=require('dotenv').config();
const cors=require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const { default: mongoose } = require('mongoose');
const userRoutes=require('./routes/userRoutes');
const app=express();

app.use(cors);
app.use(bodyparser.json());
app.use(urlencoded({extended:false}));
const port=process.env.PORT;

// function checkCapital(text){
//     var re=/([A-Z]+)[0-9]+/;
//     var match=re.exec(text);
//     if(match){
//         console.log('test passed ok!!')
//     }else{
//         console.log('capital letter needed');
//     }
// }



// checkCapital('fenA0');

mongoose.connect(process.env.DB_CONFIG,{useNewUrlParser: true, useUnifiedTopology: true,dbName:'chat'}).then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    })
}).catch((err)=>{
    console.log(`cant connect to server ${err.message}`)
})


setTimeout(()=>{
   app.use('/api',userRoutes);
},200)




