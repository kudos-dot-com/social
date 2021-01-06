import {React,useState , useEffect} from 'react'
import bg from '../img/chat.jpg'
import "./fontawesome/index"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css';
import { Card,Navbar,Nav, Button, Container, Media ,Spinner,Form} from 'react-bootstrap'
import io from 'socket.io-client'

const socket=io.connect("http://localhost:5001/chat")
// socket.on('messages',socket=>{
function Side({current,user}) {

    const [chats,setchats]=useState([]);
    const [text,settext]=useState("");
    const [curr,setcurr]=useState({});
    
    useEffect(() => {
    
        //console.log(media);
        fetch("http://localhost:5001/dashboard",{
            method:"get",
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('jwt') 
            }
        })
        .then(res=>res.json())
        .then(data=>{
        
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])
    
    socket.on('new data',(data)=>{
        console.log(data.message);
        {
        const dataline={chat:data.message.text,user:data.message.user,from:data.user};
        const arr=[...chats,{text:data.message[0].text,user:data.message[0].user}];
        setchats(arr);
        }
        
    })
    
    //console.log(chats);
 
    const setchange=(text)=>{
   
      
    fetch("http://localhost:5001/chat",{
            method:"post",
            headers:{
                'content-type':'application/json',
                'Authorization':'Bearer '+ localStorage.getItem('jwt') 
            },
            body:JSON.stringify({
                message:text,
                user:current.name
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })

        const dataline={text:text,from:user.name,user:current.name};
        const arr=[...chats,dataline];
        setchats(arr);    
    console.log(text);
   
    
       

    }
    return (
        <div style={{paddingTop:'5px'}}>
            {/* <img src={bg} style={{height:'88vh',width:'100%'}} /> */}
            <div id="chat">
            <Navbar bg="" style={{background:'#00b894',display:current.name===''?'none':'block'}} sticky="bottom">
                  <Navbar.Brand href="#home">
                  <div className="d-flex">
                  <img src={current.image} style={{height:'60px',width:'60px',borderRadius:'50%'}}></img>
                  <h5 className="align-self-center px-2">{current.name}</h5>
                  </div>             
                   </Navbar.Brand>
            </Navbar>

           <div className="text-white">
             {
                   chats.map(chat=>{
                   // if(chat.user==current.name)
                    return (
                    <div className="" style={{color:'#333',background:'#ccc',height:'50px',padding:'5px 20px',borderRadius:'20px',width:'25%'}}>
                        <h5>{chat.text}</h5>
                    </div>
                    )})
                    

                
             }
           </div>

            <Navbar bg="" style={{background:'transparent',position:'fixed',bottom:'0',width:'100%',display:current.name===''?'none':'block'}} >
                  <>
                  <Form style={{width:'48%'}}>
      <>
        <div className="d-flex">
       <input onChange={(e)=>settext(e.target.value)} type='text' placeholder='Write a comment' name='text' style={{width:'100%',height:'45px',background:'#ddd',color:'#000',borderRadius:'20px',outline:'none',border:'none',padding:'15px',margin:'auto'}}/>   
        <label for={current._id} style={{cursor:'pointer',right:'15%',top:'50%',transform:'translate(-250%,20%)'}}><FontAwesomeIcon style={{height:'30px',width:'25px',color:'#0006'}} icon="paper-plane"/>
        </label>
       </div>
      </>
        <Button style={{display:'none'}} id={current._id} onClick={()=>{setchange(text)}}>click</Button>
       </Form>
                    </>
            </Navbar>
            </div>
        </div>
    )
}

export default Side;