import {React,useState , useEffect} from 'react'
// import Friend from './Friend'
import Side from './Side'
function Chat() {
    
    const [url,setimageurl]=useState("");
    const [user,setuser]=useState([]);
    const [click,setclick]=useState({name:'',image:''});
    const [user1,setuser1]=useState();
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
        console.log(data.user.friends);
        setuser1(data.user);
        setuser(data.user.friends);
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])
    
    const changeState=(friends)=>{
        console.log(friends)
        setclick(friends.postUser);
    }
    console.log(user1);
    return (
        <div style={{height:'100vh',boxSizing:'border-box'}}>
            <br /> <br /> <br />
            <div className="" style={{position:'absolute',left:'0',width:'50%',paddingTop:'5px'}}> 
            <div style={{height:'88vh',width:'100%',background:'#fff'}}>
            {
                user.map(friends=>{
                    return (
                        <div className="" onClick={()=>changeState(friends)} style={{marginTop:'0px',borderBottom:'1px solid #0004',padding:"0px 19px"}}>
                            <div className="d-flex bg-white px-2" style={{height:'80px',width:'100%'}} >
                            <img src={friends.postUser.image} style={{height:'70px',width:'70px',borderRadius:'50%'}}/>
                            <h5 className="align-self-center px-2">
                                {friends.postUser.name}
                            </h5>
                            </div>
                            
                            </div>
                    )
                })
            }
        </div>
            </div>
            <div style={{position:'absolute',right:'0%',width:'50%'}}>
            <Side current={click} user={user1} />
            </div>
            
          
        </div>
    )
}

export default Chat;