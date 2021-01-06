const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;
const chatSchema=new mongoose.Schema({

message:[{
    text:'String',
    user:'String'
}]
,
chatUser:{
    type:ObjectId,
    ref:"Users"
},
reciever:{
    type:'String',
    default:'dummy',
    required:true
}
})

mongoose.model('Chats',chatSchema);