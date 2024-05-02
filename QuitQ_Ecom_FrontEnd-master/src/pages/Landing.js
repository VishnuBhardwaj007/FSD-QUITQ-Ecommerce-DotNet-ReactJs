import './Landing.css';
import Login from './Login';
import Register from './Register';

import {useState} from "react"
import UserRegistrationForm from './UserRegistraion';
function Landing(props){
  const [showlogin,setShowlogin] = useState(true)
    
    function toggle(){
        setShowlogin(!showlogin)
    }
    return(
        <div className="main_landing">
          <div className="left" style={{display:"flex",flexDirection:"column",justifyContent:"center",marginLeft:"45px"}}>
            <img src='/Images/logo.png' ></img>
            <div>"Discover Trends, Discover Deals, Discover Delight."</div>
            
        </div>
          
          <div className="right" >
          {showlogin ?<Login toggle={toggle} userloggedin={props.userloggedin} setUserLoggedIn={props.setUserLoggedIn} userData = {props.userData} setUserData= {props.setUserData}/>:<UserRegistrationForm toggle={toggle} userloggedin={props.userloggedin} setUserLoggedIn={props.setUserLoggedIn}/>}
        
        </div>
          
    </div>
    )
}
export default Landing;