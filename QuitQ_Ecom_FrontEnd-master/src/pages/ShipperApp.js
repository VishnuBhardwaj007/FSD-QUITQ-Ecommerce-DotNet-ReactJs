import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { getShippers } from "../API";
import { useNavigate, useParams } from "react-router-dom";
import "../Components/ProductDetail.css"
import { toBeChecked } from "@testing-library/jest-dom/matchers";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



function Inventory(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectRow, setSelectedRow] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [updateDisplay,setUpdateDisplay] = useState(false);
  const [order,setOrder] = useState({})
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showValidate,setShowValidate] = useState(true)
  const [shipId,setShipId] = useState(null)
  const [generateOtp,setGenerateOtp] = useState(false)
  const [otpValue, setOtpValue] = useState('');
  
  
  
  
  
  
  const navigate = useNavigate();
  
  const myRef = useRef();
  


  useEffect(() => {
    setLoading(true);
    console.log("came here",selectedStatus);
    getShippers()
      .then((res) => {
        // Log the JSON response
        console.log(res);
        setDataSource(res); // Assuming `res` has a `products` property
        setLoading(false); // Update loading state
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        setLoading(false); // Update loading state in case of error
      });

  }, [selectedStatus,order,generateOtp]);


  




  const handleRowClick = (record) => {
    setShipId(record.shipperId)
  //  console.log(record);
   
   
    const token = localStorage.getItem('token');
    fetch(`https://localhost:7036/api/order/${record.orderId}`,{ headers: {
      'Authorization': `Bearer ${token}`
    }})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(orderData => {
    // Process the order data here
    console.log('Order details:', orderData);
    setOrder(orderData)
  })
  .catch(error => {
    // Handle errors here
    console.error('Error fetching order details:', error);
  });

    

  
    




    setSelectedRow(true)
  };
  const handleStatusUpdate = (orderID,selectedStatus,otp,shipId) => {
    // Fetch call to update order status
    // console.log(orderId,selectedStatus);
    // return
    
    const token = localStorage.getItem('token');
    fetch(`https://localhost:7036/api/shipment/updateorder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ orderId:orderID,orderStatus:selectedStatus })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      return response;
    })
    .then(data => {
      // Handle success
      console.log('Order status updated successfully:', data);
      setSelectedStatus(selectedStatus)
      const obj = {orderId:orderID,OTP:otp,shipperId:shipId}
      handleRowClick(obj)
      // Optionally, you can update the UI or display a success message
      toast.success('Order status updated successfully');
    })
    .catch(error => {
      // Handle errors
      console.error('Error updating order status:', error);
      // Optionally, you can display an error message
      toast.error('Failed to update order status');
    });
  };
  function handleGenerateOTP(shipId){
      // console.log(shipId);
      // return
      const url = `https://localhost:7036/api/shipment/generateotp/${shipId}`;
      const authToken = localStorage.getItem("token")
    
      fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json' // Assuming JSON content type
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response JSON
      })
      .then(data => {
        // Handle successful response data here
        setGenerateOtp(data)
        

        console.log('OTP generated successfully:', data);
        toast.success('OTP generated successfully');
      })
      .catch(error => {
        // Handle errors here
        console.error('Error generating OTP:', error);
      });
  
    
  }
  const handleOtpChange = (event) => {
    setOtpValue(event.target.value);
  };

  function handleValidateOtp(shipId, orderId, otp) {
    
    // console.log(shipId,orderId,otpValue);
    // return
    const url = `https://localhost:7036/api/shipment/validateotp`;
    const authToken = localStorage.getItem("token");
    
    const shipperData = {
      ShipperId: shipId,
      OTP: otp,
      OrderId: orderId
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json' // Assuming JSON content type
      },
      body: JSON.stringify(shipperData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response JSON
    })
    .then(data => {
      // Handle successful response data here
      if(data===true){
        const obj = {orderId:orderId,OTP:otp,shipperId:shipId}
      handleRowClick(obj)
      toast.success('OTP validation successfully');
      setGenerateOtp(data)
      console.log('OTP validation successful:', data);
      }
      else{
        toast.error('OTP validation Unsuccessfull');
      }
      
    })
    .catch(error => {
      // Handle errors here
      toast.error('OTP validation Unsuccessfull');
      console.error('Error validating OTP:', error);
    });
  }
  

  return (
    <div className="app">
      <h1>Shippings</h1>
    <Space size={20} direction="vertical" style={{display:"flex",justifyContent:"center"}}>

      <Table
        loading={loading}
        columns={[
          {
            title: "Shipper-ID",
            dataIndex: "shipperId",
            
            
          },
          {
            title: "Order-Id",
            dataIndex: "orderId",
          },
         

          
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      ></Table>
       {selectRow ?
        <div className="app">
          
          
          <div className="details" key={order.orderId}>
            

            <div className="box">
              <div className="row" style={{ flexDirection: "column", margin: 0, paddingBottom: 0 }}>
              <h2>Order-ID : {order.orderId}</h2>
                <h2>Order-Date : {order.orderDate}</h2>


              </div>

              <p>Order Status : {order.orderStatus}</p>
              <p>Shipping Address : {order.shippingAddress}</p>

              
              <h1>Amount : ${order.totalAmount}</h1>
              {order.orderStatus!=="delivered"?<><form onSubmit={(e) => { e.preventDefault(); handleStatusUpdate(order.orderId,selectedStatus,order.OTP,shipId); }}>
            <label htmlFor="status">Update Order Status:</label>
            <select id="status" value={selectedStatus} onChange={(e) =>{ setSelectedStatus(e.target.value)}}>
              <option value="">Select</option>
              <option value="dispatched">Dispatched</option>
              <option value="out_for_delivery">Out for Delivery</option>
              {/* Add more options as needed */}
            </select>
            
            <button type="submit" style={{marginTop:"4px"}}>Update Status</button>
          </form> 
          <br></br>
             <button onClick={()=>{handleGenerateOTP(shipId)}}>Generate OTP</button>
             
        {showValidate? <form onSubmit={(e)=>{e.preventDefault();;handleValidateOtp(shipId,order.orderId,otpValue)}}>
      <label htmlFor="otp">Enter OTP</label>
      <input 
        type="text"
        id="otp"
        value={otpValue} // Bind input value to state
        onChange={handleOtpChange} // Handle input change
        required
      />
      <button type="submit" style={{ marginTop: "4px" }}>Validate OTP</button>
    </form> :""}</>:<h6>delivered</h6>}
              

            </div>

          </div>
          

        </div> : ""} 
        
      <ToastContainer />
    </Space>
    </div>
  );
}
export default Inventory;