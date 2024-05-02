import "./Login.css"
import {useState,useEffect,useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../User/UserContext";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function Login(props){
  const navigate = useNavigate();
  //const {userData,setUserData} = useContext(UserContext)
  // write here login fetch for api/login
  const [isLoading, setIsLoading] = useState(false);
  const [userlogindata,setUserloginData] = useState({
    username:"",
    password:"",
  })
  
  
  const handleinput = (e) => {
    const {name,value} = e.target
    setUserloginData({...userlogindata,[name]:value})
    // console.log(userdata)
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    fetch("https://localhost:7036/api/token/login", {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(userlogindata),
  })
  .then(response => response.json()) // Return the result of response.json()
  .then((data) => {
    setIsLoading(false);
    //console.log(data);
      if(data.success==="True"){
        localStorage.setItem('token', data.token);
        console.log(data.userData)
        props.setUserData(data.userData)
        

       localStorage.setItem('userId',data.userData.userId)
      //console.log(data.userData);
      
      props.setUserLoggedIn(true)
      toast.success('successfully logged in')
      
      navigate("/");
      
    }
  })
  // Handles errors by JSON
  .catch(error => {
    setIsLoading(false);
    toast.error('invalid creadentials');
      console.error(error);
  });
  
  };

  
  return(
         
          <div className="main_login_form">
      {isLoading ? (
        <div className="loading">
         <img src="Images/loading.png"/>

        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="login_form">
            <input className="login_form_items" name="username" value={userlogindata.username} onChange={handleinput} type="text" placeholder="username" />
            <input className="login_form_items" name="password" value={userlogindata.password} onChange={handleinput} type="password" placeholder="password"/>
            <button className="login_form_items" type="submit">Log In!</button>
            <div className="lined">
              <div className="login_form_items"> New User?</div>
              <button style={{backgroundColor:"royalblue"}} className="login_form_items" onClick={props.toggle}>Register</button>
              <div className="login_form_items"> Forgot Password?</div>
              <button  style={{backgroundColor:"royalblue"}}><Link to="/resetpassword" style={{ textDecoration: 'none', color: 'inherit'  }}>Forgot password</Link></button>
              
            </div>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}
export default Login;