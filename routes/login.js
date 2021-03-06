const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('Users');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {JWT_SECRET}=require('../config');
const verifyUser=require('../middleware/token')
const Posts=mongoose.model('Posts');


router.get('/dashboard',verifyUser,(req,res)=>{

    //const {email , password}=req.body;
    console.log(req.user);
    return res.status(200).json({user:req.user});

})

router.put('/updatepic',verifyUser,(req,res)=>{

    image=req.body;
    console.log(image);
    User.findByIdAndUpdate(req.user._id,{image:req.body.image}, function(err, result){

    console.log(req.user)
    if(err){
        res.send(err)
    }
    else{
        res.send(req.user)
    }})


})


// user search

router.get('/user/:id',verifyUser,(req,res)=>{
  console.log(req.params.id);
    User.findOne({_id:req.params.id})
  .select("-password")
  .then(response=>{
     
        Posts.find({postUser:req.params.id})
        .populate("postUser","_id name image")
        .then(posts=>{
            
            return res.json({res:response,posts:posts})
        })
    })
  .catch(err=>{
      return res.json({err:err})
  })          
})
router.post('/login',(req,res)=>{

    const {email , password}=req.body;
    console.log(email + password);
    
    User.findOne({email:email})//, password:bcrypt.hash(password,10)
    .then(saved=>{
        if(saved)
        {
        res.statusCode=200;  
        const token=jwt.sign({_id:saved._id},JWT_SECRET)
        res.json({success:"user found",token:token,user:{saved}});

        console.log('found');

        }else{
            res.statusCode=403;  
            res.json({err:"sorry not found"});    
            console.log('not found');
        }
    })
})

router.put('/follow',verifyUser,(req,res)=>{
    
    let counter=false;
    const friend={
        postUser:req.user
    }
    req.user.friends.map(friends=>{
        if(friends.postUser._id==req.body.friendId)
        {
            counter=true;
            console.log('found');
            // break;
        }
    })


    if(counter===true)
    {console.log("ys");
        User.findByIdAndUpdate(req.body.friendId,{$set:{friends:friend}},{new:true})
        .then(response=>
            {
                const frienduser={
                    postUser:req.body.user
                }
            User.findByIdAndUpdate(req.user._id,{
                $set:{friends:frienduser}
            },{
                new:true
            })
            //.populate("friends","_id name image ")
            //.populate({path:"friends",select:"_id name image",model:User})
            .then(friends=>{    
            return res.status(200).json({res:'friend added chill'})
            })
        })
        .catch(err=>{
             // if(err)
        return response.status(422).json({err:err})
        
        })
    }
    else{
        return res.json({res:'already exits'});
    }
    })    



module.exports=router;