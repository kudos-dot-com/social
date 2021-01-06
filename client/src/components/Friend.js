import {React,useState , useEffect} from 'react'
import {Card, Button, Container, Media ,Spinner,Dropdown} from 'react-bootstrap'

function Friend() {

    const [url,setimageurl]=useState("");
    const [user,setuser]=useState([]);
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
        setuser(data.user.friends);
        // setimageurl(data.user.friends.postUser.image);
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])
    
    return (
        <div style={{height:'88vh',width:'100%',background:'#fff'}}>
            {
                user.map(friends=>{
                    return (
                        <div className="" style={{marginTop:'0px',borderBottom:'1px solid #0004',padding:"0px 19px"}}>
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
    )
}

export default Friend;
