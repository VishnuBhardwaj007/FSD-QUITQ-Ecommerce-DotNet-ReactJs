import React, { useEffect, useState } from 'react'

const PaymentSuccess = () => {
    const [isSuccess,setIsSuccess] = useState(false);
    const userId = localStorage.getItem("token")
    useEffect(() => {
        fetch(`https://localhost:7036/api/checkout/verify-payment/?userId=${userId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Do something with the response data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during the fetch call
    console.error('Error:', error);
  });
    
      }, []);
  return (
    <div>
      {isSuccess?<h1>ordered Successfully</h1>:<h1>try again later...</h1>}
    </div>
  )
}

export default PaymentSuccess
