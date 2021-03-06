const express=require('express');
// const app=express();
// const http=require('http').createServer(app);
// const io=require('socket.io')(http);
const router=express.Router();
const mongoose=require('mongoose');
const Posts=mongoose.model('Posts');
const Chats=mongoose.model('Chats');
const verifyUser=require('../middleware/token')


// io.on('connection',socket=>{
//     console.log("server connected via socket");
// })


router.post('/chat',verifyUser,(req,res)=>{
    const {message,user}=req.body;
    const chatuser={
        text:message,
        user:user
    }
    const chat=new Chats({
        message:chatuser,
        chatUser:req.user
    })
    chat.save()
    .then(chats=>{
        return res.status(200).json({chat:chats})
    })
    .catch(err=>{
        //console.log(err);
        return res.status(422).json({err:err})

    })
})

router.get('/getchats',verifyUser,(req,res)=>{
    Chats.find({chatUser:req.user._id})
    .populate("chatUser","id name image")
    .then(chats=>{
        return res.status(200).json({chat:chats})
    })
    .catch(err=>{
        //console.log(err);
        return res.status(422).json({err:err})

    })
})
router.get('/posts',verifyUser,(req,res)=>{
    Posts.find()
    .populate("postUser","id name image friends")
    .then(post=>{
        res.statusCode=200;
        return res.json({post});
    })
})
router.post('/create',verifyUser,(req,res)=>{

    const{title,body,image}=req.body;

    console.log(title,body,image);

    const post=new Posts({
        title:title,
        body:body,
        image:image,
        postUser:req.user
    })
    post.save()
    .then(posts=>{
        res.statusCode=200;
        console.log(posts);
        return (res.json({success:"post updated",userPost:posts}));
    }) 

});

router.get("/mypost",verifyUser,(req,res)=>{
    Posts.find({postUser:req.user._id})
    .populate("postUser","_id name image")
    .then(posts=>{
        
        return res.json({posts});
        
       
    })
    .catch(err=>{
        res.json({error:err})
    })
})

router.post('/comment',verifyUser,(req,res)=>{
    const comment={
        text:req.body.text,
        postUser:req.user
    }
    console.log(req.body._id);
    Posts.findByIdAndUpdate(req.body._id,{
        $push:{comments:comment}
    },
    {
        new:true
    })
    //.populate("comments.postUser","_id name")
    .then((err, result)=>{

        console.log(result)
        if(err){
            res.send(err)
        }
        else{
            res.json({res:result})
        }})
    })

    router.post('/like',verifyUser,(req,res)=>{
        const likeuser={
            reaction:req.body.reaction,
            postUser:req.user
        }
        
        Posts.findByIdAndUpdate(req.body._id,
        {    
            // $pull:{likes:{postUser:req.user}}
            //$push:{likes:likeuser}
            $set:{likes:likeuser}
            
        },
        {
            new:true
        })
        //.populate("comments.postUser","_id name")
        .then((err, result)=>{
    
            console.log(result)
            if(err){
                res.send(err)
            }
            else{
                res.json({res:result})
            }})
        })

       

module.exports=router;