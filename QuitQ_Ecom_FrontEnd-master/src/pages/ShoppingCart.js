import React, { useState, useEffect,useContext } from 'react';
import styles from './ShoppingCart.module.css';
import { UserContext } from '../User/UserContext';
import ProductDetail from '../Components/ProductDetail';
import photo from './login_required.png'
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

const ShoppingCart = (props) => {
  const {userData,setUserData} = useContext(UserContext)
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  //console.log(userData)
  
  const fetchCartItems = async () => {
    try {

      
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId')

      
      const options = {
        method: 'GET',
        headers: {
          // Use the Bearer schema
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await fetch(`https://localhost:7036/api/cart/${userId}`,options);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data); // Set the fetched cart items
        console.log(data);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  useEffect(() => {
   
    

    fetchCartItems();
  }, []);

  async function handleQuantity(cartId,type){
    try {

     
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId')

      
      const options = {
        method: 'POST',
        headers: {
         
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      var response="";
      if(type=="increase"){
        response = await fetch(`https://localhost:7036/api/cart/increase-quantity/${cartId}`,options);
      }
      else if(type==="decrease"){
        response = await fetch(`https://localhost:7036/api/cart/decrease-quantity/${cartId}`,options);
      }
      else{
        const options = {
          method: 'Delete',
          headers: {
            
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        response = await fetch(`https://localhost:7036/api/cart/delete/${cartId}`,options);
      }
      
      if (response.ok) {
       
       console.log(response);
       fetchCartItems();
       
      } else {
        console.error('Failed to fetch incrase  the product items');
      }
    } catch (error) {
      console.error('Error fetching product increse items:', error);
    }
  }

  useEffect(() => {
    // Calculate the total whenever the cart items change
    const newTotal = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);

  function handleContinueShopping(){
    navigate('/products')
  }

  function handleCheckOut(){
    navigate('/useraddresses',{state:{isCheckOutClicked:true}})
  }
  
 
  return (
    <>
      {props.userloggedin ? (
        cartItems.length <= 0 ? (
          <div className="app">
      <div className="details" style={{justifyContent:"center"}}>

          <div className="big-img">
              <img src='/Images/image.png' alt="" />
              
          </div>
          </div>
</div>
        ) : (
          <div className="app">
            <div className={styles.container}>
              <div className={styles.header}>Shopping Bag ({cartItems.length}) </div>
              {cartItems.map((item) => (
                <div key={item.cartId} className={styles.cartItem}>
                  <div className={styles.itemDetails}>
                    <img className={styles.image} src={`/Images/${item.productImage.split('\\').pop()}`} alt={item.name} />
                    <div>
                      <div className={styles.itemName}>{item.productName}</div>
                      <div className={styles.itemPrice}>${item.productPrice}</div>
                    </div>
                  </div>
                  <div className={styles.quantityControl}>
                    <button className={styles.cart} onClick={() => { handleQuantity(item.cartId, "decrease") }}>-</button>
                    {item.quantity}
                    <button className={styles.cart} onClick={() => { handleQuantity(item.cartId, "increase") }}>+</button>
                    <div className={styles.itemPrice}>${item.productPrice * item.quantity}</div>
                    <button className={styles.cart} onClick={() => { handleQuantity(item.cartId, "delete") }}>Delete</button>
                  </div>
                </div>
              ))}
              <div className={styles.total}>Total: ${total.toFixed(2)}</div>
              <div className={styles.checkoutContainer}>
                <div className={styles.continueButton} onClick={handleContinueShopping}>Continue Shopping</div>
                <div className={styles.checkoutButton} onClick={handleCheckOut}>Checkout</div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="app">
          <div className="details" style={{ justifyContent: "center" }}>
            <div className="big-img">
              <img src={photo} alt="" />
              {/* this to show the error page */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}  

export default ShoppingCart;
