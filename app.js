const express=require('express');
const app=express();
const http=require('http').createServer(app);
const io=require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });
// const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const {MONGO_URI}=require('./config');
var cors = require('cors')

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

require("./models/users");
require("./models/posts");
require("./models/chat");

const User=mongoose.model('Users');



Port=process.env.PORT || 5001;

const userAuth=require('./routes/userAuth');
const login=require('./routes/login');
const postRoute=require('./routes/posts');
const updateRoute=require('./routes/update');

app.use(cors());

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected",()=>{
    console.log("database connnceted");
})
mongoose.connection.on("error",(err)=>{
    console.log("error connecting to the database",err);
})

const db=mongoose.connection

io.of('/chat').on('connection', function(socket) {
    console.log('A user connected');
   
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });


db.once('open',()=>{
    const chat=db.collection("chats");
    const changestream=chat.watch();

    changestream.on('change',(change)=>{
        
        if(change.operationType==='insert')
        {
            const chatdetails=change.fullDocument;
            console.log(chatdetails);
            
           io.of('/chat').emit('new data',chatdetails);
                        
            
            
            
        }
    })

    const user=db.collection("users");
    const changestream2=user.watch();
   
    changestream2.on('change',(change)=>{
        
        console.log(change);
        if(change.operationType==='update')
        {
            userdetails=change.documentKey;     
            User.findOne({_id:userdetails})
            .then(res=>{
                
            })
            .catch(err=>{
                console.log(err);
            })
            //let arr=[];
            //arr=[...userdetails];
            // console.log(arr[arr.length-1]);
            console.log(userdetails);
            
        //    io.of('/chat').emit('new data',chatdetails);
                        
            
            
            
        }
    })
    
})

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//269g0sHgRHJoXeJU

app.use('/signup',userAuth);
app.use(login);
app.use(postRoute);
//app.use(updateRoute);

http.listen(Port,()=>{
    console.log("server connected");
})