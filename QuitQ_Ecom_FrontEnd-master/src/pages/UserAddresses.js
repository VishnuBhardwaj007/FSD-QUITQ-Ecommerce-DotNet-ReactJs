import React, { useEffect, useState } from 'react';
import  './UserAddresses.css'
import { useLocation, useNavigate } from 'react-router-dom';
import AddUserAddress from './AddUserAddress';

const UserAddresses = () => {
    const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddNewAddressClicked,setIsAddNewAddressClicked] = useState(false)
  const [updated,setUpdated] = useState(false)
  const [defaultUserAddress,setDefaultUserAddress] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isCheckOutClicked = location.state?.isCheckOutClicked;
  const [refresh,setRefresh] = useState(0);
  function onSubmit(data){
    if(data=="refresh"){
      setRefresh(refresh+1)
      setIsAddNewAddressClicked(false)
    }
  }
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await fetch(`https://localhost:7036/api/user-addresses/user/${userId}`, options);
        if (response.ok) {
          const data = await response.json();
          setAddresses(data);
          // Find the default address (statusId = 1) and set it as selected
          const defaultAddress = data.find(address => address.statusId === 1);
          
          if (defaultAddress) {
            setDefaultUserAddress(defaultAddress.userAddressId)
            setSelectedAddressId(defaultAddress.userAddressId);
          }
        } else {
          console.error('Failed to fetch addresses');
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    setUpdated(false)
    fetchData();
  }, [refresh]);

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    // Additional logic if needed when an address is selected
  };

  const handleAddNewAddress = () => {
    setIsAddNewAddressClicked(true)
  };

  function handleCheckOutPayment(){
    console.log("clicked on the payment");
    navigate('/payment')
  }

  function handleDeleteAddress(userAddressId) {
    const token = localStorage.getItem('token');
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  
    fetch(`https://localhost:7036/api/user-addresses/${userAddressId}`, options)
      .then(response => {
        if (response.ok) {
          // Handle success
          setUpdated(true)
          setRefresh(refresh+1)
          console.log('User address deleted successfully');
          // Optionally, you can update your UI or perform additional actions here
        } else {
          // Handle error
          console.error('Failed to delete user address');
        }
      })
      .catch(error => {
        console.error('Error deleting user address:', error);
      });
  }
  

  const handleUpdateAddress = async () => {
    
    try {
      const selectedAddress = addresses.find(address => address.userAddressId === selectedAddressId);
      if (!selectedAddress) {
        console.error('Selected address not found');
        return;
      }
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({...selectedAddress,statusId:1} )
      };
      const response = await fetch(`https://localhost:7036/api/user-addresses/${selectedAddressId}`, options);
      if (response.ok) {
        // Handle success, e.g., show a success message
        
        setRefresh(refresh+1)
        console.log('Selected address updated successfully');
      } else {
        console.error('Failed to update selected address');
      }
    } catch (error) {
      console.error('Error updating selected address:', error);
    }
  };

  return (
    <div className="app">
      <div className="details" >
        <div className="big-img">
    <div className="address-container">
      <h1>Select Delivery Address</h1>
      {addresses.map(address => (
        <div key={address.userAddressId} className="address-item">
          <label>
            <input
              type="radio"
              value={address.userAddressId}
              checked={address.userAddressId === selectedAddressId}
              onChange={() => handleAddressSelect(address.userAddressId)}
            />
            {defaultUserAddress!=address.userAddressId?<button style={{backgroundColor:"red"}} onClick={()=>handleDeleteAddress(address.userAddressId)}>delete</button>:""}
            <div className="address-details">
              <div>Door Number: {address.doorNumber}</div>
              <div>Apartment Name: {address.apartmentName}</div>
              <div>Landmark: {address.landmark}</div>
              <div>Street: {address.street}</div>
              <div>City: {address.cityId}</div>
              <div>Postal Code: {address.postalCode}</div>
              <div>Contact Number: {address.contactNumber}</div>
            </div>
          </label>
        </div>
      ))}
    </div>
    <div className="button-container" >
            <button onClick={handleAddNewAddress}>Add New Address</button>
            <button onClick={handleUpdateAddress}>Save Delivery Address</button>
            {isCheckOutClicked? <button onClick={handleCheckOutPayment}>Proceed To CheckOut</button>:""}
          </div>
    </div>
    {isAddNewAddressClicked?<AddUserAddress setIsAddNewAddressClicked={setIsAddNewAddressClicked} isCheckOutClicked={isCheckOutClicked} onSubmit={onSubmit}/>:""}
    
    </div>
    </div>
  );
};

export default UserAddresses;
