import { useState } from 'react';
import './Navbar.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
function Navbar(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  function handleSelectionChange(event) {
    const path = event.target.value;
    navigate(path);
    setSelectedOption('');
  }
  const navigate = useNavigate();
  function handlelogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    props.setUserData({
      userId: null,
      username: '',
      contactNumber: '',
      dateOfBirth: null, // Assuming date can either be a string or null
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      userRole: '',
      userStatus: ''
    })

    props.setUserLoggedIn(false)
    navigate("/")

  }


  return (
    <>
      <nav id='navbar_horizontal'>
        <div className='navbar_items ' id='bigtitle'>QuitQ</div>

        <div className="navbar_items" ><Link className='link navbar_item' to={""}>Home</Link></div>
        

        
         <div className="navbar_items" ><Link className='link navbar_item' to={"profile"}>Profile</Link></div> 

        {props.userData.userRole === "admin" ?
          <div className="navbar_items"><Link className='link navbar_item' to={"admin"}>Admin</Link></div> : null}


        {props.userData.userRole === "admin" || props.userData.userRole === "seller"?
          <div className="navbar_items"><Link className='link navbar_item' to={"stores"}>Stores</Link></div> : null}

{props.userData.userRole === "admin" ?
          <div className="navbar_items"><Link className='link navbar_item' to={"shipper"}>Shipments</Link></div> : null}

        <div className="navbar_items"><Link className='link navbar_item' to={"cart"}>Cart</Link></div>

        <div className="navbar_items"><Link className='link navbar_item' to={"wishlist"}>wishList</Link></div>
       
         <div className="navbar_items"><Link className='link navbar_item' to={"vieworders"}>Orders</Link></div>

        



        {props.userloggedin ? <div className="navbar_items " onClick={handlelogout}><Link className='link navbar_item' >logout</Link></div> : <div className="navbar_items" ><Link className='link navbar_item' to={"/login_register"}>login</Link></div>}






      </nav>



      <div id='navbar_dropdown' >
        <h1 id='mobile_heading'><div>QuitQ</div><div className="menu-icon" onClick={() => setIsDropdownVisible(!isDropdownVisible)} style={{ backgroundColor: "steelblue" }}>
          {/* &#9776; Hamburger Icon */}
          <select value={selectedOption} onChange={handleSelectionChange} className="navbar_select"  >
            <option value="" style={{}}> &#9776;</option> {/* Default, non-selectable option */}
            <option value="/">Home</option>

            
            {props.userloggedin ?
              <option value="/logout" onClick={handlelogout}>Logout</option> :
              <option value="/login_register">Login/Register</option>
            }
           

          </select>
        </div></h1>


      </div>
    </>
  )
}
export default Navbar