import './App.css';
import './index.css'
import Navbar from './pages/Navbar'
import Room from "./pages/Room"
import Home from "./pages/Home"
import Contact from './pages/Contact';
import { useEffect, useState ,useContext} from 'react';
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"

import Landing from './pages/Landing';
import AddProductForm from './pages/AddProductForm';
import Brand from './pages/BrandForm';
import BrandForm from './pages/BrandForm';
import PaymentGateway from './pages/PaymentGateway';
import ShoppingCart from './pages/ShoppingCart';

import Banner from './Components/Banner';
import ProductGrid from './Components/ProductGrid';
import Temp from './Components/Temp';
import Filters from './Components/Filter';
import ProductDetail from './Components/ProductDetail';

import Footer from './Components/Footer';
import Footer2 from './Components/Footer2';
import Footer3 from './Components/Footer3';
import CategorySlider from './Components/CategorySlider';



import { UserContext, UserProvider } from './User/UserContext';
import AddNewStoreForm from './pages/AddNewStoreForm';
import StoreApp from './pages/StoreApp';
import Store from './pages/Store';
import AddUserAddress from './pages/AddUserAddress';
import UserAddresses from './pages/UserAddresses';
import ShipperApp from './pages/ShipperApp';
import AdminApp from './pages/AdminApp';
import OrdersPage from './pages/OrdersPage';
import UserRegistrationForm from './pages/UserRegistraion';
import UpdateUser from './pages/UpdateUser';
import PaymentSuccess from './pages/PaymentSuccess';
import UserDetails from './pages/UserDetails'

import Wishlist from "./pages/WishList";
import ResetPassword from './pages/ResetPassword';




const API_ENDPOINT = 'https://localhost:7036/api/categories';

function App(){
  const [userloggedin,setUserLoggedIn] = useState(true)
  
  //const [isAuthenticated,setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('token'))||null);
  const [userData, setUserData] = useState({
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
  });
  useEffect(()=>{
    // if(isAuthenticated!=null){
    //   setUserLoggedIn(true);
    // }
    

    fetch("https://localhost:7036/api/token/isauthenticated", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then((data) => {
      if (data.success) {
        
        setUserLoggedIn(true);
        console.log(data.userData);
        setUserData(data.userData)
        

      } else {
        setUserLoggedIn(false);
        localStorage.removeItem('token');
          localStorage.removeItem('userId');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setUserLoggedIn(false);
      localStorage.removeItem('token');
          localStorage.removeItem('userId');
    });
  },[]);
  const [mode,setMode] = useState("dark_mode")
  
  function togglemode(){
    if (mode==="white_mode"){
      setMode("black_mode")
    }
    else{
      setMode("white_mode")
    }
    console.log(mode)
  }
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
      };
  
  return (
    <>
    <UserProvider>
    <div className='container' id={{mode}}>
      <Router>
      <header>
        <Navbar  userloggedin={userloggedin} setUserLoggedIn={setUserLoggedIn} userData={userData} setUserData={setUserData} />

      </header>
      <main >
        <div className='main_div' >
        
        <Routes>
          
          <Route path='' element={<Home/>}/>
          <Route path='resetpassword' element={<ResetPassword/>}/>

          <Route path='/login_register' element={<Landing userloggedin={userloggedin} setUserLoggedIn={setUserLoggedIn} userData={userData} setUserData={setUserData} />}/>
          <Route path='/products' element={<Room userloggedin={userloggedin}/>}/>
          <Route path="/products/:productId" element={<ProductDetail userloggedin={userloggedin}/>} />
          <Route path='/contact' element={<Contact/>}/>
          {/* Protected routes */}
          {userloggedin ? (
                    <>
                      <Route path='/cart' element={<ShoppingCart userloggedin={userloggedin}/>} />
                      <Route path='/profile' element={<UserDetails/>} />
                      <Route path='/addnewproduct' element={<AddProductForm />} />
                      <Route path='/addbrand' element={<BrandForm />} />
                      <Route path='/payment' element={<PaymentGateway userloggedin={userloggedin}/>} />
                      <Route path='/paymentsuccess' element={<PaymentSuccess userloggedin={userloggedin}/>} />
                      <Route path='/addnewaddress' element={<AddUserAddress />} />
                      <Route path='/useraddresses' element={<UserAddresses userloggedin={userloggedin}/>} />
                      <Route path='/vieworders' element={<OrdersPage userloggedin={userloggedin}/>} />
                      <Route path='/shipper' element={<ShipperApp userData={userData} />} />
                      <Route path='/addnewstore' element={<AddNewStoreForm />} />
                      <Route path='/stores' element={<Store userloggedin={userloggedin} setUserLoggedIn={setUserLoggedIn} userData={userData} setUserData={setUserData} />} />
                      <Route path='/stores/:storeId/*' element={<StoreApp userloggedin={userloggedin} />} />
                      <Route path='/admin/*' element={<AdminApp userloggedin={userloggedin} />} />
                      
                      <Route path="/wishlist" element={<Wishlist />} />

                    </>
                  ) : (
                    <Route path='*' element={<Landing userloggedin={userloggedin} setUserLoggedIn={setUserLoggedIn} userData={userData} setUserData={setUserData} />}/>
                  )}
          <Route path='/userregistration' element={<UserRegistrationForm/>}/>
          <Route path='*' element={<Temp/>}/>
         
        </Routes>

        
        </div>
        
      </main>
      <div>


      <footer>
      

      </footer>


</div>
      {/* <footer>
        <p>QuitQ Copyrights 2024</p>
      </footer> */}
      </Router>
    </div>
    </UserProvider>
    </>
  );
}

export default App;
