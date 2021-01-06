const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:false
      },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false,
        default:'due image'
    },
    friends:[{
    postUser:{ 
        type:'object'  
    }}]

})

mongoose.model('Users',userSchema);