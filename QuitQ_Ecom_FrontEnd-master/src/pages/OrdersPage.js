import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imgs, setImgs] = useState({})

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const response = await fetch(`https://localhost:7036/api/order/all/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user orders');
        }

        const ordersData = await response.json();
        console.log(ordersData);
        let imagesByOrderId = {}; // Object to store images by order ID

        ordersData.forEach(order => {
          let orderId = order.orderId;
          imagesByOrderId[orderId] = []; // Initialize an empty array for each order ID

          order.orderItemListDTOs.forEach(item => {
            // Assuming 'productImage' is the property containing the image URL
            if (item.product.productImage !== null) {
              let img = item.product.productImage.split('\\').pop();
              imagesByOrderId[orderId].push(img); // Push image to the array associated with the order ID
            }
          });
        })
        setImgs(imagesByOrderId)
        //console.log(imagesByOrderId);




        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user orders:', error.message);
        setError('Failed to fetch user orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div>
      
      {orders.length === 0 ? (
        <div className="app">
        <div className="details" style={{justifyContent:"center"}}>
  
            <div className="big-img">
                <img src='/Images/noOrdersYet.png' alt="" />
                
            </div>
            </div>
  </div>
      ) : (
       




<div className="app">
<h1>My Orders</h1>
{/* key={product.productId} */}
            <div className="details" >
              
            <div className="row" style={{flexDirection:"column",margin: 0, paddingBottom: 0,margin:"20px"}}>
                        {/* <h2>{product.productName}</h2> */}
                    
                        {orders.map(order => (
            <div key={order.orderId} style={{border:"2px solid black",marginBottom:"3px",padding:"20px"}}>
              <h2>Order ID: {order.orderId}</h2>
              
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Order Status: {order.orderStatus}</p>
              <p>OTP :{order.shipper!=null?<span>{order.shipper}</span>:<span>Not Generated Yet</span>}</p>
              <h3>Order Items:</h3>
              <ul>
                {order.orderItemListDTOs.map((orderItem, index) => (
                  <li key={index}>
                    <p>Product Name: {orderItem.product.productName}</p>
                    <p>Quantity Ordered: {orderItem.quantity}</p>
                  </li>
                ))}
              </ul>
              <p>Shipping Address: {order.shippingAddress}</p>
              {imgs[order.orderId].length>0?
              <div className="thumb" >
                
                        {imgs[order.orderId].map((img, index) => (
                          
                            <img src={`Images/${img}`} alt="" key={index}  />
                        ))}   </div>:<h6>No Images To display</h6>}
                 
            </div>
          ))}
                    </div>
            </div>
            </div>

      )}
    </div>
   
  );
}

export default OrdersPage;

