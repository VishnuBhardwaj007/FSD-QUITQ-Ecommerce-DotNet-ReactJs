export const getOrders = (storeId) => {
    //return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
    const token = localStorage.getItem('token');
    return fetch(`https://localhost:7036/api/order/store/${storeId}`,{ headers: {
    'Authorization': `Bearer ${token}`
  }}).then((res)=>{
  if (!res.ok) {
    throw new Error('Network response was not ok');
}
    return res.json()}) .catch((error) => {
      console.error('Error fetching orders:', error);
      return []; // Return an empty array or handle the error as needed
  });
  };
  

  
  export const getInventory = (storeId) => {
    //return fetch("https://dummyjson.com/products").then((res) => res.json());
    return fetch(`https://localhost:7036/api/products/store/${storeId}`).then((res)=>{
      if (!res.ok) {
          throw new Error('Network response was not ok at inventory call');
      }
      return res.json();
  }).catch((error) => {
    console.error('Error fetching inventory:', error);
    return []; // Return an empty array or handle the error as needed
});
  };
  
  export const getCustomers = () => {
    return fetch(`https://localhost:7036/api/users`).then((res)=>{
      if (!res.ok) {
          throw new Error('Network response was not ok at users call');
      }
      return res.json();
  }).catch((error) => {
    console.error('Error fetching users:', error);
    return []; // Return an empty array or handle the error as needed
});
  };



  export const getShippers = () => {
    const token = localStorage.getItem('token');
    return fetch(`https://localhost:7036/api/shipment/all`,{ headers: {
    'Authorization': `Bearer ${token}`
  }}).then((res)=>{
  if (!res.ok) {
    throw new Error('Network response was not ok');
}
    return res.json()}) .catch((error) => {
      console.error('Error fetching orders:', error);
      return []; // Return an empty array or handle the error as needed
  });
  }
