import {useNavigate } from 'react-router-dom';
import { UserContext } from '../User/UserContext';
import './Contact.css'
import { useContext, useState } from "react"



function Contact(){
  const { productToDisplay, setProductsToDisplay } = useContext(UserContext);
  const navigate = useNavigate();
  
    
    const [usercontact,setUsercontact] = useState({
        name:"",
        email:"",
        message:"",
      })
      const handleinput = (e) => {
        const {name,value} = e.target
        setUsercontact({...usercontact,[name]:value})
       
        // console.log(userdata)
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        
        navigate('/products',{state:{subCategoryId:1}})
        
      };



    return(
        <>
        <div id="main_contact">
                <div className="contact_heading">Reach Us ..</div>
                <form onSubmit={handleSubmit}>
                <div className="contact_form">
                <input className="contact_inputs" name="name" value = {usercontact.username} onChange={handleinput} type="text" placeholder="Name"/>
                <input className="contact_inputs" name="email" value = {usercontact.username} onChange={handleinput} type="email" placeholder="Email"/>
                <textarea className="contact_inputs" name="message" value = {usercontact.username} onChange={handleinput} rows="10"   placeholder="Enter Your Message"></textarea>
                <button style={{marginLeft:"6px"}} className="contact_inputs">Send Message</button>
                </div>
                </form>
        </div>       
        
            
        </>
    )
}
export default Contact