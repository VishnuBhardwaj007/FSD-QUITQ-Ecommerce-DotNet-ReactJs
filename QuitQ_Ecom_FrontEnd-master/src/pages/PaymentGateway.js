
import React, { useState, useEffect } from 'react';
import useRazorpay from "react-razorpay";
import styles from './ShoppingCart.module.css';
import photo from './login_required.png'
import { useNavigate } from 'react-router-dom';
import { Bounce, Flip, ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const PaymentGateway = (props) => {
  // const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState({});
  const [Razorpay] = useRazorpay()
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  useEffect(() => {

    const fetchCartItems = async () => {
      const options = {
        method: 'GET',
        headers: {
          // Use the Bearer schema
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const response = await fetch(`https://localhost:7036/api/cart/${userId}`, options);
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
    const fetchUserActiveAddress = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await fetch(`https://localhost:7036/api/user-addresses/useractive/${userId}`, options);
        if (response.ok) {
          const data = await response.json();
          setAddress(data)
          console.log(data); // Log the retrieved active user addresses
          // Optionally, update state or perform other actions with the retrieved data
        } else {
          console.error('Failed to get active user address');
        }
      } catch (error) {
        console.error('Error fetching active user address:', error);
      }
    }
    fetchCartItems(); // Fetch cart items when component mounts
    fetchUserActiveAddress();
  }, []);
  useEffect(() => {
    // Calculate the total whenever the cart items change
    const newTotal = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);
  const handlePayment = async () => {
    if (cartItems.length > 0) {
      try {

        const response = await fetch('https://localhost:7036/api/checkout/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            amount: total,
            currency: "INR"
          })
        });

        if (response.ok) {
          // Handle success, maybe show a success message
          //redirect to view your orders page 
          console.log('Payment successful!');

          const paymentDetails = await response.json()

          console.log(paymentDetails)
          if (!window.Razorpay) {
            throw new Error("Razorpay library not loaded");
          }

          const options = {
            key: paymentDetails.key,
            amount: paymentDetails.amount,
            currency: paymentDetails.currency,
            name: paymentDetails.name,
            order_id: paymentDetails.order_id,
            callback_url: paymentDetails.callback_url,
          };
          console.log(options);
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          // Handle errors, maybe show an error message
          console.error('Payment failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  function handlePaymentCod() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId")
    fetch(`https://localhost:7036/api/payments/cod/${userId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
    })
    .then(data => {
        // Handle the data returned from the API
        //show toast msg
       
        console.log("order info : ", data);
        if(data.flag){
          toast.success('successfully placed order', {
            position: "top-center",
            autoClose: 5200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
            });
          navigate("/vieworders")
        }
        else{
          toast.warning(data.msg, {
            position: "top-center",
            autoClose: 5200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
            });
        }
    })
    .catch(error => {
        // Handle errors that occurred during the fetch
        console.error('There was a problem with the fetch operation:', error);
    });
}

  

  return (<>
    {cartItems.length > 0 ?
      <div className="app">
        <div className="details" >
        
          <div>
            <h1>Payment</h1>
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
                      <div className={styles.header}>Order Items ({cartItems.length}) </div>
                      {cartItems.map((item) => (
                        <div key={item.cartId} className={styles.cartItem}>
                          <div className={styles.itemDetails}>
                            <img className={styles.image} src={`/Images/${item.productImage.split('\\').pop()}`} alt={item.name} />
                            <div>
                              <div className={styles.itemName}>{item.productName}</div>
                              <div className={styles.itemPrice}>${item.productPrice}</div>
                              <div className={styles.itemName}>Quantity:{item.quantity}</div>
                            </div>
                          </div>

                        </div>
                      ))}
                      <div className={styles.total}>Total: ${total.toFixed(2)}</div>
                      {/* <div className={styles.checkoutContainer}>
                <div className={styles.continueButton} onClick={handleContinueShopping}>Continue Shopping</div>
                <div className={styles.checkoutButton} onClick={handleCheckOut}>Checkout</div>
              </div> */}
                      <div className="app">
                      <div className={styles.container}>
                      <div className={styles.header}>Delivery Address </div>
                          
                          <div className="address-details">
                            <div>Door Number: {address.doorNumber}</div>
                            <div>Apartment Name: {address.apartmentName}</div>
                            <div>Landmark: {address.landmark}</div>
                            <div>Street: {address.street}</div>
                            <div>City: {address.cityId}</div>
                            <div>Postal Code: {address.postalCode}</div>
                            <div>Contact Number: {address.contactNumber}</div>
                          </div>
                        </div>
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
                    <h3>Choose Payment Method</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <button onClick={handlePayment}>Pay Online</button>
                      <button onClick={handlePaymentCod}>Cash On Delivery</button>
                    </div>
                  </div>

        </div>

          </div>:<div className="app">
      <div className="details" style={{justifyContent:"center"}}>

          <div className="big-img">
              <img src='/Images/image.png' alt="" />
              
          </div>
          </div>
</div>}
<ToastContainer/>
        </>
        );
};

        export default PaymentGateway;