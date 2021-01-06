import {React,useState , useEffect} from 'react'
import {Card, Button, Container, Media,Dropdown} from 'react-bootstrap'
import './fontawesome/index'
import Status from './Post'
import logo from '../img/logo.jpeg'
import userpicdemo from '../img/userpicdemo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cardfooter from './Cardfooter'
import '../App.css'
import {Link} from 'react-router-dom'

function Posts({data,key}){
  console.log(data);
  const [open,setOpen]=useState(false);  
  
  return (
    <div className="">
      <Card className=" mt-4 mb-4 shadow-lg mb-3" id="cardish">
        <Card.Body>
          <Card.Title>
          <Media left href="#" className="d-flex">
       
            <img width={64} height={64} className="mr-3" src={data.postUser.image==='due image'?(userpicdemo):(data.postUser.image)}  style={{borderRadius:'50%'}}/>
            <Media.Body>
              <h5 className="mt-3" style={{textDecoration:'none',color:'#000'}}> <Link to={"/user/"+data.postUser._id}  style={{textDecoration:'none',color:'#000'}}>{data.postUser.name} </Link></h5>
            </Media.Body>
          <div>
          <FontAwesomeIcon className="mt-3" icon="ellipsis-h" onClick={()=>setOpen(!open)}/>
          </div>  
         <div style={{position:'absolute',right:'10px',top:'10%',display:open?'block':'none'}} className="shadow-lg bg-white">
         <Dropdown>
              <>
                  <Dropdown.Item href="#/action-1">Add Friend</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Update</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
              </>
          </Dropdown> 
         </div>
         
          </Media>
          </Card.Title>
         
          <Card.Text style={{textTransform:'capitalize',fontSize:'15px'}}>
         {data.body}
        </Card.Text>
          <hr />
          <img  src={data.image} id="image" style={{}}/> 
          {/* style={{ width: '500px',height:'400px',margin:'auto' }}/> */}
      <Cardfooter exodus={data._id} dataset={data.comments} like={data.likes}/>
     </Card.Body>
   </Card>
    </div>
  );
  }
function Mypost() {
    
  const [post,setposts]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:5001/mypost",{
            method:"get",
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('jwt') 
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.posts);
            setposts(data.posts);
        })
  },[])
  
  return (
        <div style={{}}>
           
            <>
          
            {
            post.map(data=>(
              
              <Posts data={data} key={data._id} />
            ))
          }
          
          
          
          
         
             </>
         </div>
       
    )
}

export default Mypost;